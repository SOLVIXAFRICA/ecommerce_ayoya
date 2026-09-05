import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UNIT_PRICE = 5000

export default function Home() {
  const [quantity, setQuantity] = useState(1)
  const navigate = useNavigate()

  const total = quantity * UNIT_PRICE

  const handleCommander = () => {
    navigate('/cart', { state: { quantity } })
  }

  const imgOnError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    (e.target as HTMLImageElement).style.display = 'none'
  }

  return (
    <div className="bg-surface">
      {/* HERO */}
      <section className="relative w-full overflow-hidden bg-surface-container-lowest pt-20">
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary via-surface-container-lowest to-surface" />
        <div className="relative max-w-[78rem] mx-auto px-4 lg:px-8 pt-10 pb-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="inline-flex items-center gap-2 self-start px-4 py-1 bg-surface-container-high rounded-full">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">Édition Fondatrice • 75 cl</span>
              </div>
              <div className="space-y-2">
                <span className="font-script-accent text-script-accent text-secondary italic block">Noblesse Africaine</span>
                <h1 className="font-display-hero text-display-hero-mobile lg:text-display-hero text-on-surface leading-tight tracking-tight">
                  L&#39;Âme des Terroirs, <br />
                  <span className="text-primary italic">La Noblesse Africaine.</span>
                </h1>
              </div>
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                Inspirée des liqueurs traditionnelles africaines, AYOYA est un spiritueux d&#39;exception élaboré à partir de la racine éponyme et d&#39;ingrédients naturels minutieusement sélectionnés. Une alchimie ambrée façonnée pour l&#39;éternité.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-2">
                {[
                  { k: 'Titre', v: '40% Vol.' },
                  { k: 'Volume', v: '75 cl' },
                  { k: 'Botanique', v: '100% Nat.' },
                  { k: 'Origine', v: 'Maison Dassi' },
                ].map((s) => (
                  <div key={s.k} className="flex flex-col p-3 bg-surface-container-low rounded-lg">
                    <span className="font-label-caps text-label-caps text-primary uppercase">{s.k}</span>
                    <span className="font-headline-sm text-headline-sm text-on-surface">{s.v}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3 pt-1">
                <button
                  onClick={handleCommander}
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary-fixed text-on-primary font-label-caps text-label-caps uppercase rounded-lg shadow-xl shadow-primary/20 transition-all duration-300"
                >
                  Commander le flacon (5 000 FCFA)
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
                <a href="#manifeste" className="inline-flex items-center justify-center px-6 py-4 bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-caps text-label-caps uppercase rounded-lg transition-colors">
                  Explorer la tradition
                </a>
              </div>
            </div>
            <div className="lg:col-span-6 relative flex justify-center items-center">
              <div className="absolute -inset-4 bg-gradient-to-tr from-secondary/15 via-primary/20 to-transparent blur-3xl rounded-full pointer-events-none" />
              <div className="relative w-full max-w-lg aspect-[3/4] rounded-xl overflow-hidden shadow-2xl bg-surface-container">
                <img
                  src="/images/ayoya/stitch/img_7.jpg"
                  alt="Flacon AYOYA reposant sur un socle de bois sombre et satin"
                  className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
                  onError={imgOnError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 inset-x-4 flex items-end justify-between backdrop-blur-md bg-surface-container-lowest/60 p-4 rounded-lg">
                  <div>
                    <p className="font-label-caps text-label-caps text-primary uppercase">Écrin de Cérémonie</p>
                    <p className="font-headline-sm text-headline-sm text-on-surface">Le Rituel AYOYA</p>
                  </div>
                  <span className="font-headline-md text-headline-md text-primary font-semibold">5 000 <span className="text-body-sm font-normal">FCFA</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MANIFESTE */}
      <section id="manifeste" className="relative w-full py-12 lg:py-24 bg-surface">
        <div className="max-w-[78rem] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-5 order-2 lg:order-1 relative">
              <div className="relative rounded-xl overflow-hidden shadow-xl bg-surface-container-high aspect-[3/4]">
                <img src="/images/ayoya/stitch/img_2.jpg" alt="Mains d&#39;artisan en contact avec la terre" className="w-full h-full object-cover object-center" onError={imgOnError} />
                <div className="absolute inset-0 bg-gradient-to-t from-surface/70 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-4 bg-surface-container-lowest/85 backdrop-blur-md rounded-lg">
                  <p className="font-label-caps text-label-caps text-primary uppercase">Maison Marchande Dassi</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant italic">« Chaque goutte porte en elle la mémoire de nos aïeux et la clarté du geste bien fait. »</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7 order-1 lg:order-2 flex flex-col gap-6">
              <div className="space-y-2">
                <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Le Manifeste Fondateur</span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface leading-tight">Au carrefour des époques, entre hier et demain.</h2>
              </div>
              <div className="p-6 lg:p-8 bg-surface-container-low rounded-xl relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
                <blockquote className="relative font-headline-md text-headline-md lg:text-[28px] lg:leading-[42px] text-on-surface italic">
                  « Au carrefour des époques, entre hier et demain, <span className="text-primary font-semibold">AYOYA</span> catalyse la noblesse de nos traditions pour l&#39;offrir au monde, avec fierté et contemporanéité. »
                </blockquote>
                <div className="mt-6 flex items-center justify-between">
                  <span className="font-label-caps text-label-caps uppercase text-secondary tracking-widest">— Devise Officielle • Noblesse Africaine</span>
                  <span className="w-12 h-0.5 bg-primary/40" />
                </div>
              </div>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                AYOYA n&#39;est pas un simple spiritueux. C&#39;est un pont jeté entre la pharmacopée mystique des forêts sacrées et l&#39;art de vivre des grandes tables contemporaines. Née de la ferveur de préserver nos élixirs indigènes, chaque cuvée scelle un pacte de respect avec la terre nourricière d&#39;Afrique subsaharienne.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="flex items-start gap-3 p-4 bg-surface-container rounded-lg">
                  <span className="material-symbols-outlined text-primary text-2xl">workspace_premium</span>
                  <div>
                    <h4 className="font-label-serif text-label-serif text-on-surface uppercase">Héritage Intact</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Procédés ancestraux de macération prolongée à froid.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-surface-container rounded-lg">
                  <span className="material-symbols-outlined text-primary text-2xl">psychiatry</span>
                  <div>
                    <h4 className="font-label-serif text-label-serif text-on-surface uppercase">Souveraineté Botanique</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Sélection rigoureuse des rhizomes d&#39;exception.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RACINE SACREE */}
      <section id="racine" className="relative w-full py-12 lg:py-24 bg-surface-container-lowest">
        <div className="max-w-[78rem] mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10 lg:mb-12 space-y-2">
            <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Botanique d&#39;Élite</span>
            <h2 className="font-display-hero text-headline-lg lg:text-display-hero text-on-surface">L&#39;Arbre &amp; La Racine Sacrée</h2>
            <p className="font-body-md text-body-md text-on-surface-variant">Sous l&#39;écorce vénérable, le souffle de la terre. La racine AYOYA s&#39;épanouit dans les sols denses, gorgée de minéraux rares et d&#39;arômes insoupçonnés.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch mb-10">
            <div className="lg:col-span-7 relative rounded-xl overflow-hidden aspect-[4/3] bg-surface-container">
              <img src="/images/ayoya/stitch/img_3.jpg" alt="Racines sacrées et braises" className="w-full h-full object-cover object-center" onError={imgOnError} />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-surface-container-lowest/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-block px-3 py-1 bg-primary text-on-primary font-label-caps text-label-caps uppercase rounded mb-2">Infusion Alchimique</div>
                <h3 className="font-headline-md text-headline-md text-on-surface">Extraction Lente par Macération Thermique</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant max-w-xl mt-1">La racine déploie une chaleur intérieure qui enveloppe le palais : des notes terreuses, boisées, doucement épicées avec une persistance caramel ambré.</p>
              </div>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-4 p-6 bg-surface-container rounded-xl">
              <h3 className="font-headline-sm text-headline-sm text-primary flex items-center gap-2"><span className="material-symbols-outlined">menu_book</span> Formule &amp; Composition Pure</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Une formule inviolée, dépourvue de tout additif synthétique, fidèle à la charte de pureté Dassi.</p>
              <ul className="space-y-2 pt-1">
                {[
                  ['Eau de source filtrée', 'Purifiée'],
                  ['Alcool de grain surfin', 'Haute distillation'],
                  ['Extrait pur de racine AYOYA', 'Cœur Actif'],
                  ['Arômes de terroirs d\u2019Afrique', '100% Botaniques'],
                  ['Sucre de canne raffiné & Caramel', 'Robe Ambrée'],
                ].map(([a, b]) => (
                  <li key={a} className="flex items-center justify-between p-3 bg-surface-container-high rounded-lg">
                    <span className="font-body-sm text-body-sm text-on-surface font-medium">{a}</span>
                    <span className="font-label-caps text-label-caps text-primary">{b}</span>
                  </li>
                ))}
              </ul>
              <div className="pt-1 flex items-center gap-2 text-on-surface-variant text-body-sm">
                <span className="material-symbols-outlined text-primary">verified</span>
                <span>Certifié sans colorants chimiques ni conservateurs industriels.</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {[
              { icon: 'visibility', title: 'La Robe', text: `Or sombre aux reflets cuivrés profonds et chauds, d\u2019une grande brillance, laissant paraître des larmes généreuses le long de la paroi du verre.` },
              { icon: 'view_in_ar_new', title: 'Le Nez', text: `Attaque immédiate de bois précieux, écorce fumée, vanille sauvage et racines fraîches broyées dans un mortier cérémoniel.` },
              { icon: 'local_bar', title: 'La Bouche', text: `Une texture soyeuse et enveloppante. L\u2019amertume racinaire est subtilement tempérée par une rondeur caramélisée.` },
            ].map((c) => (
              <div key={c.title} className="p-6 bg-surface-container-low rounded-xl flex flex-col gap-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-1"><span className="material-symbols-outlined">{c.icon}</span></div>
                <h4 className="font-headline-sm text-headline-sm text-on-surface">{c.title}</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DEGUSTATION */}
      <section id="degustation" className="relative w-full py-12 lg:py-24 bg-surface">
        <div className="max-w-[78rem] mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div className="space-y-2 max-w-2xl">
              <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">L&#39;Art du Service</span>
              <h2 className="font-display-hero text-headline-lg lg:text-display-hero text-on-surface">Partager l&#39;Excellence lors de Moments Choisis</h2>
              <p className="font-body-md text-body-md text-on-surface-variant">Qu&#39;elle soit savourée dans l&#39;intimité d&#39;une fin de soirée ou au cœur d&#39;une assemblée vibrante, la liqueur AYOYA magnifie les instants précieux.</p>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-surface-container-high rounded-full self-start md:self-auto">
              <span className="material-symbols-outlined text-primary text-sm">celebration</span>
              <span className="font-label-caps text-label-caps text-on-surface uppercase">Rituels &amp; Cocktails</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-surface-container-low group shadow-lg">
              <img src="/images/ayoya/stitch/img_4.jpg" alt="Dégustation festive" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" onError={imgOnError} />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4"><span className="font-label-caps text-label-caps text-primary uppercase">Célébration &amp; Partage</span><p className="font-headline-sm text-headline-sm text-on-surface">L&#39;Allégresse des Grands Soirs</p></div>
            </div>
            <div className="relative rounded-xl overflow-hidden aspect-[4/3] bg-surface-container-low group shadow-lg">
              <img src="/images/ayoya/stitch/img_5.jpg" alt="Verres élégants et flacon AYOYA" className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" onError={imgOnError} />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4"><span className="font-label-caps text-label-caps text-primary uppercase">Savoir-Boire Aristocratique</span><p className="font-headline-sm text-headline-sm text-on-surface">Le Geste Mesuré du Puriste</p></div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[
              { n: 'Rituel N°01', icon: 'ac_unit', title: `Pur ou \u00AB On the Rocks \u00BB`, text: `Verser 5 cl dans un verre tumbler épais sur un large cube de glace pure. Laisser tempérer deux minutes pour que la fraîcheur libère la tension aromatique des racines.`, tag: `Idéal : En ouverture de soirée` },
              { n: 'Rituel N°02', icon: 'local_bar', title: `Cocktail : Racine Royale`, text: `4 cl d\u2019AYOYA, 2 cl de jus de citron vert frais, un trait de sirop de gingembre sauvage pressé, complété d\u2019eau pétillante fraîche et d\u2019un zeste d\u2019orange brûlé.`, tag: `Idéal : Réceptions & Galas` },
              { n: 'Rituel N°03', icon: 'restaurant', title: `Digestif d\u2019Honneur`, text: `Servi chambré à 18°C dans un verre tulipe, à la fin d\u2019un banquet somptueux. Les vertus apaisantes de la racine sacrée clôturent le repas avec panache.`, tag: `Idéal : Clôture de banquets` },
            ].map((r) => (
              <div key={r.n} className="p-6 bg-surface-container rounded-xl flex flex-col justify-between gap-4 hover:bg-surface-container-high transition-colors">
                <div className="space-y-3">
                  <div className="flex items-center justify-between"><span className="font-label-caps text-label-caps text-primary uppercase">{r.n}</span><span className="material-symbols-outlined text-primary">{r.icon}</span></div>
                  <h3 className="font-headline-md text-headline-md text-on-surface">{r.title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">{r.text}</p>
                </div>
                <div className="pt-4"><span className="font-label-caps text-label-caps text-secondary uppercase">{r.tag}</span></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLACON / COMMANDER */}
      <section id="commander" className="relative w-full py-12 lg:py-24 bg-surface-container-lowest">
        <div className="max-w-[78rem] mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-surface-container aspect-[4/5] flex items-center justify-center">
                <img src="/images/ayoya/stitch/img_6.jpg" alt="Bouteille AYOYA mise en majesté" className="w-full h-full object-cover object-center" onError={imgOnError} />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest/90 via-transparent to-transparent" />
                <div className="absolute top-4 left-4 bg-surface-container-lowest/80 backdrop-blur-md px-4 py-1 rounded-full"><span className="font-label-caps text-label-caps text-primary uppercase">Cuvée Originale • 75 cl</span></div>
              </div>
            </div>
            <div className="lg:col-span-6 flex flex-col gap-6">
              <div className="space-y-2">
                <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Disponibilité Immédiate</span>
                <h2 className="font-display-hero text-headline-lg lg:text-display-hero text-on-surface leading-none">Acquérir le Flacon AYOYA</h2>
                <p className="font-body-md text-body-md text-on-surface-variant pt-2">Chaque bouteille est conditionnée à la main, marquée du sceau de l&#39;arbre séculaire et scellée pour garantir une préservation organoleptique absolue.</p>
              </div>
              <div className="p-6 bg-surface-container rounded-xl space-y-4">
                <div className="flex items-baseline justify-between">
                  <div>
                    <span className="font-display-hero text-display-hero-mobile lg:text-display-hero text-primary font-semibold">5 000</span>
                    <span className="font-headline-md text-headline-md text-on-surface ml-2">FCFA</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant block mt-1">Taxes comprises • Flacon de 75 cl (40% Vol.)</span>
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center gap-1 text-primary text-body-sm font-medium"><span className="material-symbols-outlined text-sm">inventory_2</span> En stock</span>
                    <span className="block text-label-caps font-label-caps text-on-surface-variant uppercase mt-1">Expédition 24h</span>
                  </div>
                </div>
                <div className="space-y-3 pt-2">
                  <label className="font-label-caps text-label-caps text-on-surface-variant uppercase block">Sélectionner la Quantité</label>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-surface-container-high rounded-lg p-1">
                      <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-10 h-10 flex items-center justify-center text-on-surface hover:text-primary transition-colors" aria-label="Diminuer">
                        <span className="material-symbols-outlined">remove</span>
                      </button>
                      <span className="w-12 text-center font-headline-sm text-headline-sm text-on-surface font-semibold">{quantity}</span>
                      <button onClick={() => setQuantity((q) => Math.min(24, q + 1))} className="w-10 h-10 flex items-center justify-center text-on-surface hover:text-primary transition-colors" aria-label="Augmenter">
                        <span className="material-symbols-outlined">add</span>
                      </button>
                    </div>
                    <div className="flex-1">
                      <button onClick={handleCommander} className="w-full h-12 flex items-center justify-center gap-2 px-6 bg-primary hover:bg-primary-fixed text-on-primary font-label-caps text-label-caps uppercase rounded-lg shadow-lg shadow-primary/25 transition-all duration-300">
                        <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                        <span>Commander — {total.toLocaleString('fr-FR')} FCFA</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-1 text-center">
                  {[
                    { icon: 'phone_android', label: 'Mobile Money' },
                    { icon: 'credit_card', label: 'Carte Bancaire' },
                    { icon: 'local_shipping', label: 'Paiement Livraison' },
                  ].map((b) => (
                    <div key={b.label} className="p-2 bg-surface-container-high rounded flex flex-col items-center">
                      <span className="material-symbols-outlined text-primary text-sm">{b.icon}</span>
                      <span className="font-label-caps text-[10px] text-on-surface-variant uppercase mt-1">{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 bg-surface-container-high rounded-xl flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container"><span className="material-symbols-outlined">chat</span></div>
                  <div>
                    <h4 className="font-label-serif text-label-serif text-on-surface">Service Conciergerie Privée</h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">Assistance commandes volumineuses &amp; événements spéciaux.</p>
                  </div>
                </div>
                <a href="https://wa.me/?text=Bonjour%2C%20je%20souhaite%20commander%20la%20liqueur%20AYOYA." target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-surface-container hover:bg-surface text-primary font-label-caps text-label-caps uppercase rounded-lg inline-flex items-center gap-1 shrink-0">
                  WhatsApp <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              </div>
              <div className="flex items-center justify-between text-body-sm text-on-surface-variant">
                <span>Suivez la Maison : <strong className="text-primary">@AyoyaSpirits</strong></span>
                <span>Conditionnement Sécurisé Anti-Choc</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DASSI */}
      <section className="relative w-full py-12 bg-surface">
        <div className="max-w-[78rem] mx-auto px-4 lg:px-8">
          <div className="p-8 lg:p-10 bg-surface-container rounded-2xl relative overflow-hidden">
            <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-8 space-y-4">
                <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">Héritage &amp; Fierté Africaine</span>
                <h2 className="font-headline-lg text-headline-lg text-on-surface leading-snug">Dassi Maison Marchande — La Gloire des Racines Souveraines</h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">Fondée sur la conviction inébranlable que les trésors botaniques d&#39;Afrique méritent une place parmi les plus nobles liqueurs du monde, Dassi Maison Marchande associe la traçabilité rigoureuse des terroirs aux secrets de macération des sages.</p>
                <div className="pt-1 flex flex-wrap gap-6 text-on-surface-variant font-label-caps text-label-caps uppercase">
                  <span className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">eco</span> Récolte Responsable</span>
                  <span className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">diversity_3</span> Artisans Locaux</span>
                  <span className="flex items-center gap-2"><span className="material-symbols-outlined text-primary text-base">format_image_left</span> Excellence Sans Concession</span>
                </div>
              </div>
              <div className="lg:col-span-4 flex flex-col items-center justify-center p-6 bg-surface-container-high rounded-xl text-center gap-1">
                <span className="font-headline-md text-headline-md text-primary tracking-widest font-semibold">AYOYA</span>
                <span className="font-label-caps text-label-caps text-on-surface uppercase">Symbole de Grandeur</span>
                <p className="font-body-sm text-body-sm text-on-surface-variant pt-2">« Boire AYOYA, c&#39;est honorer le passé et porter haut la couronne de nos terroirs. »</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
