from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import json
import os
from pathlib import Path
import random
import string

from app.models import Order, AdminLogin, EmailConfig, Product
from app.auth import create_access_token, verify_token
from app.email_service import send_order_email
from app.routes import config, media, zones, logistics, products, download

app = FastAPI(title="AYOYA E-Commerce API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(config.router)
app.include_router(media.router)
app.include_router(zones.router)
app.include_router(logistics.router)
app.include_router(products.router)
app.include_router(download.router)

# Static files
from fastapi.staticfiles import StaticFiles
UPLOADS_DIR = Path("/app/uploads")
UPLOADS_DIR.mkdir(exist_ok=True)
if UPLOADS_DIR.exists():
    app.mount("/uploads", StaticFiles(directory=UPLOADS_DIR), name="uploads")

ORDERS_DIR = Path("/app/orders")
ORDERS_DIR.mkdir(exist_ok=True)
CONFIG_DIR = Path("/app/config")
CONFIG_DIR.mkdir(exist_ok=True)

PRICE_PER_BOTTLE = 5000
DELIVERY_FEE = 1000
DELIVERY_FEE_DASSI = 2000

PRODUCTS_FILE = Path(__file__).parent.parent / "products.json"
if not PRODUCTS_FILE.exists():
    _alt = Path("/app/products.json")
    if _alt.exists():
        PRODUCTS_FILE = _alt


def _load_products_list():
    if not PRODUCTS_FILE.exists():
        return []
    with open(PRODUCTS_FILE) as f:
        return json.load(f)


def _save_products_list(products):
    with open(PRODUCTS_FILE, "w") as f:
        json.dump(products, f, indent=2, ensure_ascii=False)


def _find_product(product_id: str):
    for p in _load_products_list():
        if p.get("id") == product_id:
            return p
    return None


def generate_order_number():
    date_part = datetime.now().strftime("%Y%m%d")
    random_part = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
    return f"AYO-{date_part}-{random_part}"


@app.get("/health")
@app.get("/api/health")
async def health():
    return {"status": "ok", "app": "AYOYA E-Commerce"}


@app.post("/api/orders")
async def create_order(order: Order):
    order.id = f"ORD-{datetime.now().strftime('%Y%m%d%H%M%S')}-{random.randint(1000, 9999)}"
    order.order_id = generate_order_number()
    order.orderNumber = generate_order_number()
    order.created_at = datetime.now().isoformat()
    order.status = "pending"

    # Defaults pour compatibilite AYOYA existant
    if not order.product_id:
        order.product_id = "ayoya"
    if not order.site:
        order.site = "ayoya"

    # Resolution produit + calcul total + gestion stock
    products = _load_products_list()
    product = next((p for p in products if p.get("id") == order.product_id), None)

    if product is None:
        # Fallback ayoya si product_id inconnu
        product = next((p for p in products if p.get("id") == "ayoya"), None)
        if product is None:
            # Dernier recours: prix legacy
            product = {"id": "ayoya", "price": PRICE_PER_BOTTLE, "stock": 9999}

    # Stock insuffisant
    current_stock = product.get("stock", 9999)
    if current_stock < order.quantity:
        raise HTTPException(status_code=400, detail=f"Stock insuffisant pour {product.get('id')}: {current_stock} disponible, {order.quantity} demande")

    # Calcul total: product.price * quantity + deliveryFee (1000 ayoya, 2000 dassi)
    if order.order_type == 'carton' and order.product_id == "ayoya":
        subtotal = order.quantity * 25000
    else:
        subtotal = order.quantity * int(product.get("price", PRICE_PER_BOTTLE))

    if order.deliveryMethod == 'delivery':
        delivery = DELIVERY_FEE_DASSI if order.site == "dassi" else DELIVERY_FEE
    else:
        delivery = 0

    order.total = subtotal + delivery
    order.totalAmount = order.total

    # Decrementer stock et sauvegarder
    for p in products:
        if p.get("id") == product.get("id"):
            p["stock"] = int(p.get("stock", 0)) - order.quantity
            break
    _save_products_list(products)
    print(f"[ORDER] site={order.site} product_id={order.product_id} qty={order.quantity} stock_restant={product.get('stock', 0) - order.quantity if 'stock' in product else 'n/a'} total={order.total}")

    order_file = ORDERS_DIR / f"{order.id}.json"
    with open(order_file, "w") as f:
        json.dump(order.model_dump(), f, indent=2, ensure_ascii=False)

    try:
        await send_order_email(order)
    except Exception as e:
        print(f"Email error: {e}")

    return {"id": order.id, "order_id": order.order_id, "orderNumber": order.orderNumber, "status": "created", "totalAmount": order.totalAmount}


@app.get("/api/orders/{order_id}")
async def get_order(order_id: str):
    order_file = ORDERS_DIR / f"{order_id}.json"
    if not order_file.exists():
        raise HTTPException(status_code=404, detail="Order not found")

    with open(order_file) as f:
        return json.load(f)


@app.get("/api/orders")
async def list_orders(token: str = Depends(verify_token)):
    orders = []
    for file in ORDERS_DIR.glob("*.json"):
        with open(file) as f:
            orders.append(json.load(f))
    orders.sort(key=lambda x: x.get('created_at', ''), reverse=True)
    return orders


@app.post("/api/admin/login")
async def admin_login(credentials: AdminLogin):
    valid_usernames = ["admin", "admin@ayoya.bj"]
    if credentials.username not in valid_usernames or credentials.password != os.getenv("ADMIN_PASSWORD", "ayoya_admin_2024"):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = create_access_token({"sub": credentials.username, "role": "admin"})
    return {"token": token, "access_token": token, "token_type": "bearer", "role": "admin"}


@app.get("/api/admin/config")
async def get_config(token: str = Depends(verify_token)):
    config_file = CONFIG_DIR / "email_config.json"
    if not config_file.exists():
        return {"host": "", "port": 587, "user": "", "password": "", "from_email": ""}

    with open(config_file) as f:
        return json.load(f)


@app.put("/api/admin/config")
async def update_config(config: EmailConfig, token: str = Depends(verify_token)):
    config_file = CONFIG_DIR / "email_config.json"

    with open(config_file, "w") as f:
        json.dump(config.model_dump(), f, indent=2)

    return {"message": "Config updated"}
