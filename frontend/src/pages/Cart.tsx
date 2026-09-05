import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { orderAPI, OrderData } from '../services/api'

const UNIT_PRICE = 5000
const DELIVERY_PRICE = 1000
const BOX_PRICE = 2500

export default function Cart() {
  const location = useLocation()
  const navigate = useNavigate()
  const initialQty = (location.state as { quantity?: number })?.quantity ?? 2

  const [quantity, setQuantity] = useState(initialQty)
  const [withBox, setWithBox] = useState(true)
  const [giftMessage, setGiftMessage] = useState('')
  const [form, setForm] = useState({ customerName: '', phone: '', city: '', address: '' })
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery')
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'mobile'>('mobile')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const subtotal = quantity * UNIT_PRICE
  const boxTotal = withBox ? BOX_PRICE : 0
  const shipping = deliveryMethod === 'delivery' ? DELIVERY_PRICE : 0
  // ajuster pour matcher design demo 14 000 avec 2 bouteilles + box + shipping 1500 — on garde logique 1000 FCFA livrée spec
  // pour cohérence spec prix 5000 + livraison 1000
  const total = subtotal + boxTotal + shipping

  const imgOnError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.target as HTMLImageElement).style.display = 'none'
  }

  const handleSubmit = async () => {
    setError('')
    if (!form.customerName.trim() || !form.phone.trim() || !form.city.trim() || !form.address.trim()) {
      setError(`Veuillez renseigner tous les champs obligatoires.`)
      return
    }
    setLoading(true)
    try {
      const data: OrderData & { notes?: string } = {
        customerName: form.customerName.trim(),
        phone: form.phone.trim(),
        city: form.city.trim(),
        address: form.address.trim(),
        quantity,
        deliveryMethod,
        paymentMethod,
        notes: giftMessage.trim() || undefined,
      }
      const res = await orderAPI.create(data)
      const orderId = res.data?.id ?? res.data?.order?.id ?? res.data?._id
      if (orderId) localStorage.setItem('orderId', orderId)
      // passer total et details à confirmation
      navigate('/confirmation', { state: { order: res.data, total, quantity, withBox, giftMessage } })
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : `Erreur lors de la commande.`
      const axiosMsg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message
      setError(axiosMsg ?? msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-surface pt-20">
      {/* Header éditorial */}
      <section className="w-full bg-surface-container-lowest py-8 px-4 lg:px-8 shadow-md relative overflow-hidden">
        <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="max-w-[78rem] mx-auto flex flex-col gap-2 relative z-10">
          <div className="flex items-center gap-2 text-primary font-label-caps text-label-caps uppercase tracking-[0.25em]">
            <span className="inline-block w-6 h-[1px] bg-primary" />
            <span>Maison Marchande Dassi</span>
            <span className="text-outline-variant">✦</span>
            <span className="text-on-surface-variant font-normal">Allocation Privée 2024</span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mt-1">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface">Votre Sélection Impériale &amp; Commande de Prestige</h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">Flacons d&#39;Exception &amp; Rituels d&#39;Assemblage Maison Dassi</p>
            </div>
            <div className="flex items-center gap-2 bg-surface-container-low px-4 py-2 rounded-lg self-start lg:self-auto shadow-sm">
              <span className="flex items-center gap-1 text-primary font-label-caps text-label-caps uppercase"><span className="w-5 h-5 rounded-full bg-primary text-on-primary font-bold flex items-center justify-center text-[10px]">1</span> Panier &amp; Expédition</span>
              <span className="text-outline-variant text-xs">―</span>
              <span className="flex items-center gap-1 text-outline font-label-caps text-label-caps uppercase"><span className="w-5 h-5 rounded-full bg-surface-container-high text-outline text-[10px] flex items-center justify-center">2</span> Coordonnées</span>
              <span className="text-outline-variant text-xs">―</span>
              <span className="flex items-center gap-1 text-outline font-label-caps text-label-caps uppercase"><span className="w-5 h-5 rounded-full bg-surface-container-high text-outline text-[10px] flex items-center justify-center">3</span> Règlement</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-[78rem] w-full mx-auto px-4 lg:px-8 py-8 lg:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* LEFT */}
          <div className="lg:col-span-7 flex flex-col gap-8 min-w-0">
            {/* Flacon */}
            <div className="flex flex-col gap-4">
              <div className="flex items-baseline justify-between pb-1">
                <h2 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[22px]">liquor</span> Flacon de la Récolte</h2>
                <span className="font-label-caps text-label-caps text-primary uppercase">Scellé d&#39;Origine No. 184</span>
              </div>
              <div className="bg-surface-container-low rounded-xl p-6 shadow-xl relative overflow-hidden flex flex-col sm:flex-row gap-6 group">
                <div className="absolute -left-12 top-0 w-48 h-48 bg-secondary-container/10 rounded-full blur-2xl pointer-events-none" />
                <div className="relative w-full sm:w-44 h-56 sm:h-auto rounded-lg overflow-hidden bg-surface-container-lowest shrink-0 shadow-inner flex items-center justify-center">
                  <img src="/images/ayoya/stitch/img_1.jpg" alt="Bouteille AYOYA liqueur ambrée" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700" onError={imgOnError} />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 via-transparent to-transparent pointer-events-none" />
                  <span className="absolute bottom-2 left-2 bg-surface-container-high/90 text-primary font-label-caps text-[9px] px-2 py-0.5 rounded uppercase tracking-wider backdrop-blur-sm">Millésime 2024</span>
                </div>
                <div className="flex flex-col justify-between flex-1 gap-3 min-w-0">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest block">Édition Fondatrice</span>
                        <h3 className="font-headline-md text-headline-md text-on-surface tracking-tight">AYOYA</h3>
                        <p className="font-label-serif text-label-serif text-secondary italic">Liqueur de Racine Sacrée</p>
                      </div>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">40% Vol. • Flacon apothicaire 75 cl • Macération artisanale 49 jours en fûts de bois précieux.</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      <span className="bg-surface-container px-2 py-0.5 rounded font-label-caps text-[10px] text-primary uppercase">Bois Sacré</span>
                      <span className="bg-surface-container px-2 py-0.5 rounded font-label-caps text-[10px] text-secondary uppercase">Ambre &amp; Miel</span>
                      <span className="bg-surface-container px-2 py-0.5 rounded font-label-caps text-[10px] text-tertiary uppercase">Écorces Royales</span>
                    </div>
                  </div>
                  <div className="pt-3 flex items-center justify-between gap-4">
                    <div className="flex items-center bg-surface-container-high rounded-lg p-1">
                      <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-8 h-8 rounded flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-variant transition-colors" aria-label="Diminuer">
                        <span className="material-symbols-outlined text-[16px]">remove</span>
                      </button>
                      <span className="w-10 text-center font-body-md text-body-md font-semibold text-primary">{quantity}</span>
                      <button onClick={() => setQuantity((q) => Math.min(24, q + 1))} className="w-8 h-8 rounded flex items-center justify-center text-on-surface-variant hover:text-primary hover:bg-surface-variant transition-colors" aria-label="Augmenter">
                        <span className="material-symbols-outlined text-[16px]">add</span>
                      </button>
                    </div>
                    <div className="text-right">
                      <span className="font-headline-sm text-headline-sm text-primary font-semibold tracking-tight">{subtotal.toLocaleString('fr-FR')} FCFA</span>
                      <span className="block font-body-sm text-body-sm text-on-surface-variant">{quantity} × 5 000 FCFA</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Coffret + parchemin */}
              <div className="bg-surface-container rounded-xl p-6 shadow-md flex flex-col gap-4">
                <div className="flex items-start gap-4">
                  <label className="relative flex items-center pt-1 cursor-pointer">
                    <input checked={withBox} onChange={(e) => setWithBox(e.target.checked)} className="w-5 h-5 rounded accent-primary bg-surface-container-lowest text-primary cursor-pointer" type="checkbox" />
                  </label>
                  <div className="flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <label className="font-headline-sm text-[17px] text-on-surface font-medium cursor-pointer" onClick={() => setWithBox(!withBox)}>Coffret Cérémonie en Bois Noble &amp; Cachet de Cire</label>
                      <span className="font-body-md text-body-md text-primary font-semibold">+ {BOX_PRICE.toLocaleString('fr-FR')} FCFA</span>
                    </div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Fabrication artisanale sur-mesure par le maître-ébéniste de la Maison Dassi. Garniture intérieure en drap de soie dorée.</p>
                  </div>
                </div>
                <div className="bg-surface-container-lowest rounded-lg p-4 flex flex-col gap-2">
                  <div className="flex items-center gap-1 text-secondary"><span className="material-symbols-outlined text-[18px]">history_edu</span><span className="font-label-caps text-label-caps uppercase font-semibold">Message Calligraphié Offert</span></div>
                  <p className="font-body-sm text-[12px] text-on-surface-variant">Votre mot rédigé à la plume et à l&#39;encre sépia sur papier parcheminé ivoire 240g, scellé dans l&#39;écrin.</p>
                  <textarea value={giftMessage} onChange={(e) => setGiftMessage(e.target.value)} rows={2} placeholder={`Ex. En hommage à notre alliance souveraine, puisse ce flacon bénir vos noces d\u2019or...`} className="w-full mt-1 bg-surface-container-high rounded-md p-3 font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary transition-all resize-none" />
                </div>
              </div>
            </div>

            {/* Coordonnées */}
            <div className="flex flex-col gap-4">
              <div className="flex items-baseline justify-between pb-1">
                <h2 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[22px]">pin_drop</span> Lieu de Remise Sous Scellé</h2>
                <span className="font-label-caps text-label-caps text-outline uppercase">Confidentialité Diplomatique</span>
              </div>
              <div className="bg-surface-container-low rounded-xl p-6 shadow-xl flex flex-col gap-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-wider">Nom &amp; Titre du Récipiendaire *</label>
                    <div className="relative">
                      <input value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} placeholder="Prince Adébayo K." className="w-full bg-surface-container-highest rounded-md px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary" />
                      <span className="material-symbols-outlined absolute right-3 top-3 text-primary text-[18px]">verified_user</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-wider">Téléphone / WhatsApp *</label>
                    <div className="relative">
                      <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+225 07 88 42 19 03" type="tel" className="w-full bg-surface-container-highest rounded-md px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary" />
                      <span className="material-symbols-outlined absolute right-3 top-3 text-secondary text-[18px]">chat</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-wider">Ville &amp; Quartier *</label>
                    <input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder="Abidjan, Cocody Ambassades" className="w-full bg-surface-container-highest rounded-md px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="font-label-caps text-label-caps uppercase text-on-surface-variant tracking-wider">Précisions &amp; Instructions *</label>
                    <input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Villa blanche, portail noir..." className="w-full bg-surface-container-highest rounded-md px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary" />
                  </div>
                </div>
              </div>
            </div>

            {/* Protocole acheminement */}
            <div className="flex flex-col gap-4">
              <h2 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[22px]">local_shipping</span> Protocole d&#39;Acheminement</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className={`relative rounded-xl p-4 cursor-pointer transition-all flex flex-col gap-2 shadow-md ${deliveryMethod === 'delivery' ? 'bg-surface-container ring-1 ring-primary' : 'bg-surface-container-low hover:bg-surface-container-high'}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <input checked={deliveryMethod === 'delivery'} onChange={() => setDeliveryMethod('delivery')} className="w-4 h-4 accent-primary cursor-pointer" name="shipping" type="radio" />
                      <span className="font-headline-sm text-[15px] text-on-surface font-semibold">Livraison Express Sécurisée</span>
                    </div>
                    <span className="font-body-md text-body-md font-bold text-primary">{DELIVERY_PRICE.toLocaleString('fr-FR')} FCFA</span>
                  </div>
                  <p className="font-body-sm text-[12px] text-on-surface-variant">Remise discrète sous 24h à Abidjan &amp; Grandes Métropoles sous scellé royal.</p>
                  <div className="flex items-center gap-1 text-secondary font-label-caps text-[10px] uppercase"><span className="material-symbols-outlined text-[14px]">shield</span> Garde d&#39;Honneur Assurée</div>
                </label>
                <label className={`relative rounded-xl p-4 cursor-pointer transition-all flex flex-col gap-2 shadow-md ${deliveryMethod === 'pickup' ? 'bg-surface-container ring-1 ring-primary' : 'bg-surface-container-low hover:bg-surface-container-high'}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <input checked={deliveryMethod === 'pickup'} onChange={() => setDeliveryMethod('pickup')} className="w-4 h-4 accent-primary cursor-pointer" name="shipping" type="radio" />
                      <span className="font-headline-sm text-[15px] text-on-surface font-semibold">Comptoir d&#39;Honneur</span>
                    </div>
                    <span className="font-body-md text-body-md font-bold text-secondary uppercase text-xs">Gracieux</span>
                  </div>
                  <p className="font-body-sm text-[12px] text-on-surface-variant">Retrait protocolaire à la Galerie Dassi Maison Marchande (Cocody Cité Cadres).</p>
                  <div className="flex items-center gap-1 text-outline font-label-caps text-[10px] uppercase"><span className="material-symbols-outlined text-[14px]">storefront</span> Salon Privé Privilège</div>
                </label>
              </div>
            </div>

            {/* Règlement */}
            <div className="flex flex-col gap-4">
              <div className="flex items-baseline justify-between pb-1">
                <h2 className="font-headline-sm text-headline-sm text-on-surface flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[22px]">account_balance</span> Règlement Privilégié</h2>
                <span className="font-label-caps text-label-caps text-primary uppercase flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">lock</span> Chiffrement 256-Bit</span>
              </div>
              <div className="bg-surface-container-low rounded-xl p-6 shadow-xl flex flex-col gap-2">
                {[
                  { id: 'mobile', title: 'Mobile Money Instantané (Zéro Frais)', desc: 'Wave, Orange Money, MTN MoMo — Validation immédiate.', icons: ['W', 'OM', 'MTN'] },
                  { id: 'cash', title: `Paiement à la Remise en Main Propre`, desc: `Règlement en espèces exactes après vérification du scellé royal.`, icons: null },
                ].map((o) => (
                  <label key={o.id} className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-colors ${paymentMethod === o.id ? 'bg-surface-container ring-1 ring-primary' : 'bg-surface-container hover:bg-surface-container-high'}`}>
                    <div className="flex items-center gap-3">
                      <input checked={paymentMethod === (o.id as 'cash' | 'mobile')} onChange={() => setPaymentMethod(o.id as 'cash' | 'mobile')} className="w-4 h-4 accent-primary cursor-pointer" name="payment" type="radio" />
                      <div className="flex flex-col">
                        <span className="font-headline-sm text-[15px] text-on-surface font-semibold">{o.title}</span>
                        <span className="font-body-sm text-[12px] text-on-surface-variant">{o.desc}</span>
                      </div>
                    </div>
                    {o.icons ? (
                      <div className="hidden sm:flex items-center gap-2 shrink-0">
                        {o.icons.map((ic) => (
                          <span key={ic} className="w-7 h-7 rounded bg-surface-container-highest flex items-center justify-center text-primary text-xs font-bold">{ic}</span>
                        ))}
                      </div>
                    ) : (
                      <span className="material-symbols-outlined text-outline text-[22px] shrink-0">payments</span>
                    )}
                  </label>
                ))}
                {/* carte bancaire affiche informative */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-surface-container opacity-60">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-outline">credit_card</span>
                    <div className="flex flex-col">
                      <span className="font-headline-sm text-[15px] text-on-surface font-semibold">Carte Bancaire Prestige</span>
                      <span className="font-body-sm text-[12px] text-on-surface-variant">Bientôt disponible — Visa &amp; Mastercard 3D Secure.</span>
                    </div>
                  </div>
                  <span className="font-label-caps text-[10px] text-outline uppercase">Bientôt</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT sticky */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col gap-6">
            <div className="bg-surface-container-low rounded-xl p-6 lg:p-8 shadow-2xl relative overflow-hidden flex flex-col gap-6">
              <div className="absolute -right-16 -top-16 w-60 h-60 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center justify-between pb-1">
                <div className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[18px]">receipt_long</span><h3 className="font-headline-sm text-headline-sm text-on-surface">Sommaire de l&#39;Acquisition</h3></div>
                <span className="font-label-caps text-label-caps text-primary uppercase bg-primary/10 px-2 py-0.5 rounded">Édition Limitée</span>
              </div>
              <div className="flex items-center gap-4 bg-surface-container rounded-lg p-3">
                <div className="w-16 h-20 rounded bg-surface-container-lowest shrink-0 overflow-hidden relative shadow-md">
                  <img src="/images/ayoya/stitch/img_6.jpg" alt="Flacon AYOYA" className="w-full h-full object-cover" onError={imgOnError} />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="font-label-serif text-label-serif text-primary truncate">AYOYA — Racines Majestueuses</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Lot N° 84 • Macération Pure</span>
                  <span className="font-label-caps text-[10px] text-outline uppercase mt-1">{quantity} Flacon{quantity > 1 ? 's' : ''} de 75 cl réservé{quantity > 1 ? 's' : ''}</span>
                </div>
                <div className="text-right"><span className="font-headline-sm text-[16px] text-on-surface font-semibold">{subtotal.toLocaleString('fr-FR')} F</span></div>
              </div>

              <div className="flex flex-col gap-2 font-body-md text-body-md text-on-surface-variant">
                <div className="flex justify-between items-center"><span>Sous-total ({quantity} flacon{quantity > 1 ? 's' : ''} 75 cl)</span><span className="text-on-surface font-medium">{subtotal.toLocaleString('fr-FR')} FCFA</span></div>
                {withBox && (
                  <div className="flex justify-between items-center text-primary-fixed"><span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">inventory_2</span> Coffret Écrin Bois Noble &amp; Soie</span><span className="font-medium">{BOX_PRICE.toLocaleString('fr-FR')} FCFA</span></div>
                )}
                <div className="flex justify-between items-center"><span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">local_shipping</span> Expédition Diplomatique Sécurisée</span><span className="text-on-surface font-medium">{shipping === 0 ? 'Offert' : `${shipping.toLocaleString('fr-FR')} FCFA`}</span></div>
                <div className="flex justify-between items-center text-secondary"><span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">verified</span> Scellé de Cire d&#39;Abeille Royale</span><span className="font-label-caps text-label-caps uppercase font-bold">Offert</span></div>
                <div className="flex justify-between items-center text-secondary"><span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">draw</span> Calligraphie Personnalisée</span><span className="font-label-caps text-label-caps uppercase font-bold">Offert</span></div>
              </div>

              <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent my-1" />

              <div className="flex items-baseline justify-between">
                <div className="flex flex-col"><span className="font-label-caps text-label-caps uppercase tracking-widest text-outline">Total Royal à Régler</span><span className="font-body-sm text-[11px] text-on-surface-variant">Taxes locales et scellé royal inclus</span></div>
                <div className="text-right"><span className="font-display-hero text-[34px] leading-tight text-primary font-bold tracking-tight">{total.toLocaleString('fr-FR')}</span><span className="font-headline-sm text-headline-sm text-primary ml-1">FCFA</span></div>
              </div>

              {error && <div className="bg-error-container text-on-error-container px-4 py-3 rounded-lg font-body-sm text-body-sm">{error}</div>}

              <button onClick={handleSubmit} disabled={loading} className="w-full py-4 px-6 bg-primary hover:bg-primary-fixed disabled:opacity-60 text-on-primary font-label-caps text-label-caps uppercase tracking-[0.18em] font-bold rounded-lg shadow-[0_4px_24px_rgba(242,202,80,0.25)] hover:shadow-[0_8px_32px_rgba(242,202,80,0.4)] transition-all flex items-center justify-center gap-2 group">
                {loading ? 'Traitement en cours...' : 'Confirmer la Commande Royale'}
                {!loading && <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">arrow_forward</span>}
              </button>

              <a href="https://wa.me/?text=Bonjour%2C%20je%20souhaite%20commander%20la%20liqueur%20AYOYA." target="_blank" rel="noopener noreferrer" className="w-full py-3 px-4 bg-surface-container-high hover:bg-surface-bright text-secondary font-body-sm text-body-sm rounded-lg flex items-center justify-center gap-2 transition-colors text-center">
                <span className="material-symbols-outlined text-[18px] text-[#25D366]">forum</span> Commander via Conciergerie WhatsApp
              </a>

              <div className="grid grid-cols-3 gap-2 pt-1">
                {[
                  { icon: 'lock', label: 'Sceau Inviolable' },
                  { icon: 'health_and_safety', label: 'Caisse Antichoc' },
                  { icon: 'spa', label: '100% Botanique' },
                ].map((b) => (
                  <div key={b.label} className="flex flex-col items-center text-center p-2 rounded bg-surface-container-highest">
                    <span className="material-symbols-outlined text-primary text-[18px] mb-1">{b.icon}</span>
                    <span className="font-label-caps text-[9px] uppercase tracking-wider text-on-surface-variant">{b.label}</span>
                  </div>
                ))}
              </div>
              <p className="font-body-sm text-[11px] text-outline text-center leading-relaxed">Chaque flacon fait l&#39;objet d&#39;une inspection visuelle par le Maître de Chai Maison Dassi avant départ.</p>
            </div>

            <div className="bg-surface-container-lowest rounded-lg p-4 text-center shadow-inner">
              <p className="font-body-sm text-[11px] text-outline leading-normal">Allocation strictement réservée aux personnes majeures (+18 ans). L&#39;abus d&#39;alcool est dangereux pour la santé. À savourer avec noblesse et modération.</p>
            </div>

            <p className="text-center font-body-sm text-body-sm text-on-surface-variant">
              En confirmant, vous acceptez nos <Link to="/cgv" className="text-primary hover:underline font-semibold">CGV</Link>.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
