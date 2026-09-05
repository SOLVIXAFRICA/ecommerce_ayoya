import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { orderAPI } from '../services/api'

interface OrderState {
  order?: unknown
  total?: number
  quantity?: number
  withBox?: boolean
  giftMessage?: string
}

export default function Confirmation() {
  const location = useLocation()
  const state = (location.state as OrderState) ?? {}
  const [order, setOrder] = useState<Record<string, unknown> | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // priorite: state.order
    if (state.order && typeof state.order === 'object') {
      const o = state.order as Record<string, unknown>
      // api renvoie {order, id} ou direct order
      const inner = (o.order as Record<string, unknown>) ?? o
      setOrder(inner)
      setLoading(false)
      return
    }
    const orderId = localStorage.getItem('orderId')
    if (orderId) {
      orderAPI.getById(orderId).then((res) => {
        setOrder((res.data?.order ?? res.data) as Record<string, unknown>)
        setLoading(false)
      }).catch(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const imgOnError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.target as HTMLImageElement).style.display = 'none'
  }

  if (loading) {
    return (
      <div className="pt-20 pb-20 min-h-screen flex items-center justify-center bg-surface">
        <div className="bg-surface-container-low rounded-2xl p-12">
          <div className="animate-spin w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto" />
        </div>
      </div>
    )
  }

  const orderNumber = (order?.orderNumber as string) ?? (order?.id as string) ?? `AY-${new Date().getFullYear()}-8849`
  const customerName = (order?.customerName as string) ?? `Prince Adébayo K.`
  const phone = (order?.phone as string) ?? `+225 07 88 42 19 03`
  const city = (order?.city as string) ?? `Abidjan, Cocody Ambassades`
  const address = (order?.address as string) ?? `Villa blanche, portail noir`
  const quantity = (order?.quantity as number) ?? state.quantity ?? 2
  const totalAmount = (order?.totalAmount as number) ?? (order?.total as number) ?? state.total ?? quantity * 5000 + (state.withBox !== false ? 2500 : 0) + 1000
  const giftMessage = (order?.giftMessage as string) ?? state.giftMessage ?? `En hommage à notre alliance souveraine et au partage de ces racines impériales.`

  return (
    <div className="bg-surface pt-20">
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[380px] bg-primary/10 rounded-full blur-[140px] pointer-events-none -z-10" />
        <div className="max-w-[78rem] mx-auto px-4 lg:px-8 py-6 lg:py-8 flex flex-col gap-6 lg:gap-8">
          {/* Banner */}
          <section className="relative bg-surface-container-low rounded-xl p-6 lg:p-8 shadow-xl overflow-hidden">
            <div className="absolute right-0 top-0 bottom-0 w-96 opacity-5 pointer-events-none flex items-center justify-center">
              <svg className="w-full h-full fill-primary" viewBox="0 0 200 200"><path d="M100 20 C60 20 40 50 40 85 C40 120 70 145 100 180 C130 145 160 120 160 85 C160 50 140 20 100 20 Z M100 50 C110 50 120 60 120 70 C120 80 110 90 100 90 C90 90 80 80 80 70 C80 60 90 50 100 50 Z" /></svg>
            </div>
            <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="flex flex-col gap-2 max-w-3xl">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2 py-0.5 bg-primary/15 text-primary font-label-caps text-label-caps uppercase rounded">Protocole Royal d&#39;Acheminement</span>
                  <span className="text-outline text-body-sm">•</span>
                  <span className="font-label-caps text-label-caps uppercase text-on-surface-variant">Bordereau Souverain N° {String(orderNumber).slice(0, 20)}</span>
                </div>
                <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight">L&#39;Allocation Royale est Enregistrée sous Scellé Impérial</h1>
                <p className="font-body-md text-body-md text-on-surface-variant">Les racines sacrées de Côte d&#39;Ivoire ont été honorées. Votre flaconnage d&#39;exception a été consigné dans les registres confidentiels de Dassi Maison Marchande et confié au cérémonial du Chai de Cocody.</p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col items-start lg:items-end gap-3 bg-surface-container-high/60 p-4 rounded-lg backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" /><span className="relative inline-flex rounded-full h-3 w-3 bg-primary" /></span>
                  <span className="font-label-caps text-label-caps text-primary uppercase">Statut en Direct</span>
                </div>
                <div className="text-left lg:text-right">
                  <span className="font-headline-sm text-headline-sm text-on-surface block">Chai de Cocody</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Préparation sous scellé de cire noire</span>
                </div>
                <div className="inline-flex items-center gap-1 font-label-caps text-label-caps text-outline uppercase"><span className="material-symbols-outlined text-[15px] text-primary">verified</span> Certifié Maître de Chai Dassi</div>
              </div>
            </div>
          </section>

          {/* Protocole + Messager */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <section className="lg:col-span-7 flex flex-col gap-4 bg-surface-container-low p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-[24px]">history_edu</span><span className="font-headline-md text-headline-md text-on-surface">Protocole d&#39;Acheminement</span></div>
                <span className="font-label-caps text-label-caps text-primary uppercase bg-surface-container-high px-2 py-0.5 rounded">Étape 2 / 4</span>
              </div>
              <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden"><div className="bg-gradient-to-r from-primary-container to-primary h-full rounded-full" style={{ width: '48%' }} /></div>
              <div className="relative flex flex-col gap-6 mt-2 pl-4">
                <div className="absolute left-7 top-4 bottom-4 w-px bg-surface-container-highest" />
                <div className="relative flex items-start gap-4">
                  <div className="relative z-10 w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-primary shrink-0 shadow-md"><span className="material-symbols-outlined text-[18px]">done</span></div>
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 flex-wrap"><span className="font-headline-sm text-headline-sm text-on-surface">Allocation Validée &amp; Règlement</span><span className="font-label-caps text-label-caps text-outline bg-surface-container px-1 py-0.5 rounded">à l&#39;instant</span></div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Acquittement de <strong className="text-primary font-medium">{totalAmount.toLocaleString('fr-FR')} FCFA</strong>. Quittance souveraine horodatée.</p>
                  </div>
                </div>
                <div className="relative flex items-start gap-4">
                  <div className="relative z-10 w-9 h-9 rounded-full bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(242,202,80,0.45)]"><span className="material-symbols-outlined text-[20px] animate-spin" style={{ animationDuration: '6s' }}>autorenew</span></div>
                  <div className="flex flex-col gap-1 bg-surface-container/70 p-4 rounded-lg flex-1">
                    <div className="flex items-center justify-between flex-wrap gap-2"><span className="font-headline-sm text-headline-sm text-primary">Mise en flacon apothicaire &amp; Scellement à la cire</span><span className="font-label-caps text-label-caps text-primary uppercase font-bold">En cours</span></div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Flacons de liqueur de racine sacrée (Lot N° 84, cuvée 2024). Pose manuelle du cachet de cire d&#39;abeille noire.</p>
                    <div className="mt-1 flex items-center gap-3 text-outline font-body-sm text-body-sm"><span className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">workspace_premium</span> Maître artisan : Séka A.</span><span>•</span><span>18 min restantes</span></div>
                  </div>
                </div>
                <div className="relative flex items-start gap-4 opacity-60">
                  <div className="relative z-10 w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-outline shrink-0"><span className="material-symbols-outlined text-[18px]">inventory_2</span></div>
                  <div className="flex flex-col gap-1"><div className="flex items-center gap-2"><span className="font-headline-sm text-headline-sm text-on-surface">Conditionnement en coffret noble</span><span className="font-label-caps text-label-caps text-outline">Prévu 16:05</span></div><p className="font-body-sm text-body-sm text-on-surface-variant">Mise sous velours protecteur dans le coffret en bois massif.</p></div>
                </div>
                <div className="relative flex items-start gap-4 opacity-60">
                  <div className="relative z-10 w-9 h-9 rounded-full bg-surface-container-high flex items-center justify-center text-outline shrink-0"><span className="material-symbols-outlined text-[18px]">gavel</span></div>
                  <div className="flex flex-col gap-1"><div className="flex items-center gap-2"><span className="font-headline-sm text-headline-sm text-on-surface">Remise d&#39;Honneur sous Signature</span><span className="font-label-caps text-label-caps text-outline">Estimé 16h30 - 18h00</span></div><p className="font-body-sm text-body-sm text-on-surface-variant">Livraison protocolaire discrète à votre résidence — {city}.</p></div>
                </div>
              </div>
            </section>

            <section className="lg:col-span-5 flex flex-col gap-6">
              <div className="bg-surface-container-low p-6 rounded-xl shadow-lg flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest">Messager d&#39;Honneur Dédié</span>
                  <span className="inline-flex items-center gap-1 text-body-sm text-on-surface-variant bg-surface-container px-2 py-0.5 rounded"><span className="w-2 h-2 rounded-full bg-green-500" /> En veille active</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-surface-container-high flex items-center justify-center text-primary shrink-0 shadow-md"><span className="material-symbols-outlined text-[36px]">shield_person</span></div>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-headline-sm text-on-surface">M. Koffi Brou</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Officier de protocole &amp; coursier Maison Dassi</span>
                    <span className="font-label-caps text-label-caps text-primary mt-1">Agrément Privilège N° D-442</span>
                  </div>
                </div>
                <div className="bg-surface-container-highest/70 p-4 rounded-lg flex items-center justify-between">
                  <div className="flex flex-col"><span className="font-label-caps text-label-caps uppercase text-outline">Code Secret de Remise</span><span className="font-headline-md text-headline-md text-primary tracking-widest font-semibold">7824</span></div>
                  <div className="text-right max-w-[140px]"><span className="font-body-sm text-body-sm text-on-surface-variant leading-tight block">À communiquer oralement au messager lors de la remise.</span></div>
                </div>
                <div className="flex flex-col gap-1 bg-surface-container p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-on-surface"><span className="material-symbols-outlined text-[18px] text-primary">pin_drop</span><span className="font-label-serif text-label-serif">Lieu de Réception Privée</span></div>
                  <p className="font-body-md text-body-md text-on-surface pl-6 font-medium">{city}</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant pl-6">{address}</p>
                  <div className="pl-6 pt-2 flex flex-col gap-1 font-body-sm text-body-sm text-on-surface-variant">
                    <span className="flex justify-between"><span>Récipiendaire</span><span className="text-on-surface font-medium">{customerName}</span></span>
                    <span className="flex justify-between"><span>Téléphone</span><span className="text-on-surface font-medium">{phone}</span></span>
                  </div>
                </div>
                <a href={`https://wa.me/${phone.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer" className="w-full bg-surface-container-high hover:bg-surface-bright text-primary font-label-caps text-label-caps uppercase py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">chat</span> Échanger via WhatsApp Privé
                </a>
              </div>
            </section>
          </div>

          {/* Specs */}
          <section className="bg-surface-container-low rounded-xl p-6 lg:p-8 shadow-xl flex flex-col gap-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="flex flex-col gap-1"><span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Contenu du Flaconnage &amp; Privilèges</span><h2 className="font-headline-lg text-headline-lg text-on-surface">Spécifications de l&#39;Or Végétal Reçu</h2></div>
              <span className="font-body-sm text-body-sm text-outline">Délivrance certifiée par Dassi Maison Marchande — Abidjan</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              <div className="lg:col-span-5 relative rounded-xl overflow-hidden bg-surface-container-lowest shadow-2xl group">
                <img src="/images/ayoya/stitch/img_8.jpg" alt="Bouteille AYOYA dans coffret" className="w-full h-[380px] object-cover object-center group-hover:scale-105 transition-transform duration-700" onError={imgOnError} />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <span className="font-label-caps text-label-caps uppercase text-primary bg-surface/80 px-2 py-0.5 rounded backdrop-blur-sm">40% Vol. • 75 cl • Macération 49 Jours</span>
                  <span className="font-label-serif text-label-serif text-secondary-fixed">Cuvée Souveraine</span>
                </div>
              </div>
              <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="flex items-start justify-between gap-4 pb-4 border-b border-primary/10">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2"><span className="font-headline-sm text-headline-sm text-on-surface">AYOYA — Liqueur de Racine Sacrée</span><span className="text-primary font-label-caps text-label-caps bg-primary/10 px-1 py-0.5 rounded">x{quantity}</span></div>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Flacons de dégustation royale. Écorces et racines ancestrales infusées dans un distillat pur de canne.</p>
                    <div className="flex items-center gap-2 mt-1 font-label-caps text-label-caps text-outline"><span>Millésime 2024</span><span>•</span><span>Alambic Charentais en Cuivre</span></div>
                  </div>
                  <span className="font-headline-sm text-headline-sm text-primary shrink-0">{(quantity * 5000).toLocaleString('fr-FR')} FCFA</span>
                </div>
                {state.withBox !== false && (
                  <div className="flex items-start justify-between gap-4 pb-4 border-b border-primary/10">
                    <div className="flex flex-col"><div className="flex items-center gap-2"><span className="font-headline-sm text-headline-sm text-on-surface">Coffret Cérémonie en Bois Noble</span><span className="text-primary font-label-caps text-label-caps bg-primary/10 px-1 py-0.5 rounded">x1</span></div><p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Écrin d&#39;ébénisterie artisanale, intérieur drapé de satin or impérial.</p></div>
                    <span className="font-headline-sm text-headline-sm text-primary shrink-0">2 500 FCFA</span>
                  </div>
                )}
                <div className="bg-surface-container-high/80 p-4 rounded-lg flex flex-col gap-2">
                  <div className="flex items-center justify-between"><span className="font-label-caps text-label-caps text-primary uppercase flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">draw</span> Calligraphie sur Parchemin d&#39;Ivoire</span><span className="font-label-caps text-label-caps text-outline">Offert par la Maison</span></div>
                  <blockquote className="font-script-accent text-script-accent text-on-surface italic pl-4 border-l-2 border-primary/30">« {giftMessage} »</blockquote>
                </div>
                <div className="flex flex-col gap-1 pt-2">
                  <div className="flex items-center justify-between text-body-sm text-on-surface-variant"><span>Sous-total Flacons &amp; Rituels</span><span className="text-on-surface">{totalAmount.toLocaleString('fr-FR')} FCFA</span></div>
                  <div className="flex items-center justify-between pt-3 mt-1 border-t border-primary/10">
                    <div className="flex flex-col"><span className="font-headline-md text-headline-md text-on-surface">Total Réglé</span><span className="font-label-caps text-label-caps text-outline">Paiement sécurisé</span></div>
                    <div className="flex flex-col items-end"><span className="font-display-hero-mobile text-display-hero-mobile text-primary font-bold">{totalAmount.toLocaleString('fr-FR')} FCFA</span><span className="font-label-caps text-label-caps text-green-400">Soldé Intégralement</span></div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Reassurance */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { icon: 'verified_user', title: 'Sceau Botanique Certifié', text: `Chaque flacon AYOYA est garanti issu de cueillettes éthiques certifiées.` },
              { icon: 'thermostat', title: 'Protection Isotherme', text: `Transport en mallette thermo-régulée à 17°C constante.` },
              { icon: 'lock_reset', title: 'Garantie Souveraine', text: `Scellé altéré ? Remplacement immédiat sous 45 minutes.` },
            ].map((c) => (
              <div key={c.title} className="bg-surface-container-low p-6 rounded-xl flex flex-col gap-3 shadow-md">
                <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary"><span className="material-symbols-outlined text-[24px]">{c.icon}</span></div>
                <span className="font-headline-sm text-headline-sm text-on-surface">{c.title}</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{c.text}</p>
              </div>
            ))}
          </section>

          <section className="flex flex-col md:flex-row items-center justify-between gap-6 bg-surface-container-high p-6 rounded-xl shadow-xl">
            <div className="flex flex-col gap-1 text-center md:text-left"><span className="font-headline-sm text-headline-sm text-on-surface">Besoin d&#39;aménager l&#39;horaire ?</span><span className="font-body-sm text-body-sm text-on-surface-variant">Votre concierge dédié reste à votre disposition 24/7 au <strong className="text-primary">+225 07 88 42 19 03</strong></span></div>
            <div className="flex flex-wrap items-center justify-center gap-3 w-full md:w-auto">
              <Link to="/" className="px-6 py-3 bg-primary text-on-primary font-label-caps text-label-caps uppercase font-semibold rounded-lg hover:bg-primary-fixed transition-colors flex items-center gap-2 shadow-md">
                Explorer la Galerie des Rituels <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
