import json
from pathlib import Path
from fastapi import APIRouter, HTTPException, Query, Request
from fastapi.responses import StreamingResponse
from datetime import datetime, timedelta
import io
import time

router = APIRouter(prefix="/api/orders", tags=["download"])

ORDERS_DIR = Path("/app/orders")
if not ORDERS_DIR.exists():
    ORDERS_DIR = Path(__file__).parent.parent.parent / "orders"
PRIVATE_PDF = Path("/app/private/livre-pratique-bo-quotidien.pdf")
if not PRIVATE_PDF.exists():
    alt = Path(__file__).parent.parent.parent / "private" / "livre-pratique-bo-quotidien.pdf"
    if alt.exists():
        PRIVATE_PDF = alt

def _load_order(order_id: str):
    for p in ORDERS_DIR.glob("*.json"):
        if p.stem == order_id or p.stem.endswith(order_id):
            with open(p) as f:
                return json.load(f)
    # also try direct file
    f = ORDERS_DIR / f"{order_id}.json"
    if f.exists():
        with open(f) as fh:
            return json.load(fh)
    raise HTTPException(status_code=404, detail="Commande introuvable")

@router.get("/{order_id}/download")
async def download_livre(request: Request, order_id: str, token: str = Query(None)):
    order = _load_order(order_id)
    # Limite 2 téléchargements / 30 jours
    dl_file = ORDERS_DIR / f"{order_id}.downloads.json"
    now = datetime.now()
    data = {"count":0, "first":None, "last":None, "ips":[]}
    if dl_file.exists():
        try:
            with open(dl_file) as f:
                data = json.load(f)
        except: pass
        first = datetime.fromisoformat(data.get("first")) if data.get("first") else now
        if (now - first).days > 30:
            data = {"count":0, "first":now.isoformat(), "last":None, "ips":[]}
        elif data.get("count",0) >= 2:
            raise HTTPException(status_code=429, detail="Limite de 2 téléchargements atteinte (30 jours). Contactez la conciergerie.")
    else:
        data["first"] = now.isoformat()
    # Vérification site / produit — autorise si site dassi ou produit livre ou toute commande pour demo
    # En prod strict: vérifier order.get("site")=="dassi" et order.get("product_id") in ["livre_pratique","dassi_ayoya","taurus","jessferme"] — le livre est inclus
    # Pour l'instant on autorise toute commande valide mais on log
    # Token simple: si token fourni, doit matcher order_id ou orderNumber
    if token and token not in [order.get("id"), order.get("order_id"), order.get("orderNumber")]:
        # on ne bloque pas strict pour demo, mais on pourrait
        pass

    if not PRIVATE_PDF.exists():
        raise HTTPException(status_code=500, detail="PDF indisponible")

    # Watermark data
    buyer = order.get("customer_name") or order.get("customerName") or "Client Dassi"
    order_num = order.get("orderNumber") or order.get("order_id") or order_id
    date_str = datetime.now().strftime("%d/%m/%Y")
    watermark_text = f"Exemplaire personnel - {buyer} - Commande {order_num} - {date_str} - © Dassi Maison Marchande 2025 - Reproduction interdite"

    # Générer watermark PDF en mémoire
    from reportlab.pdfgen import canvas
    from reportlab.lib.pagesizes import A4
    from reportlab.lib.colors import HexColor
    import pypdf

    reader = pypdf.PdfReader(str(PRIVATE_PDF))
    writer = pypdf.PdfWriter()

    # Créer overlay watermark une fois
    packet = io.BytesIO()
    c = canvas.Canvas(packet, pagesize=A4)
    w, h = A4
    c.saveState()
    c.setFillColor(HexColor("#8C6D1F"))
    c.setFont("Helvetica", 7)
    # Footer semi-transparent
    c.setFillAlpha(0.85)
    c.drawCentredString(w/2, 18, watermark_text[:140])
    # Diagonale watermark léger
    c.setFillAlpha(0.07)
    c.setFont("Helvetica-Bold", 36)
    c.rotate(30)
    c.drawCentredString(w/2 + 100, 100, "DASSI • CONFIDENTIEL")
    c.restoreState()
    c.save()
    packet.seek(0)
    watermark_reader = pypdf.PdfReader(packet)
    watermark_page = watermark_reader.pages[0]

    for page in reader.pages:
        # Merge watermark
        page.merge_page(watermark_page)
        writer.add_page(page)

    # Métadonnées copyright
    writer.add_metadata({
        "/Author": "Dassi Maison Marchande",
        "/Title": "Pratique du BÖ au Quotidien - Exemplaire personnel",
        "/Subject": f"Commande {order_num} - {buyer}",
        "/Creator": "Dassi Officine Botanique",
        "/Producer": "Dassi Secure PDF",
        "/Copyright": "© 2025 Dassi Maison Marchande - Tous droits réservés"
    })
    # Protection: encryption owner password, allow printing but not modifying
    # User password vide (lecture sans mot de passe), owner password secret
    writer.encrypt(user_password="", owner_password="Dassi2025Officine1894", permissions_flag=0b0000100)  # print only

    out = io.BytesIO()
    writer.write(out)
    out.seek(0)

    # Log download + compteur
    ip = request.client.host if request.client else "unknown"
    data["count"] = data.get("count",0)+1
    data["last"] = now.isoformat()
    data["ips"] = (data.get("ips") or [])[-9:] + [ip]
    data["buyer"] = buyer
    data["orderNumber"] = order_num
    with open(dl_file, "w") as f:
        json.dump(data, f, indent=2)
    print(f"[DOWNLOAD] {order_id} {buyer} {order_num} count={data['count']} ip={ip}")

    filename = f"Dassi-Livre-Pratique-BO-{order_num}.pdf"
    return StreamingResponse(out, media_type="application/pdf", headers={
        "Content-Disposition": f'attachment; filename="{filename}"',
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "private, max-age=0, no-store"
    })

@router.get("/{order_id}/download-info")
async def download_info(order_id: str):
    order = _load_order(order_id)
    dl_file = ORDERS_DIR / f"{order_id}.downloads.json"
    dl = {}
    if dl_file.exists():
        try:
            with open(dl_file) as f:
                dl = json.load(f)
        except: pass
    remaining = max(0, 2 - dl.get("count",0))
    return {"order_id": order.get("id"), "orderNumber": order.get("orderNumber"), "customer": order.get("customer_name"), "site": order.get("site"), "product_id": order.get("product_id"), "download_url": f"/api/orders/{order_id}/download", "downloads": dl.get("count",0), "remaining": remaining, "first_download": dl.get("first")}
