import { Link } from 'react-router-dom'
import { useConfig } from '../hooks/useConfig'
import SocialIcons from './SocialIcons'

export default function Footer() {
  const { config } = useConfig()
  const contact = config?.contact

  return (
    <footer className="w-full bg-surface-container-lowest border-t border-primary/10">
      <div className="max-w-[78rem] mx-auto px-4 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8">
          <div className="flex flex-col gap-3">
            <span className="font-headline-sm text-headline-sm text-primary tracking-widest">AYOYA</span>
            <span className="font-label-caps text-label-caps text-on-surface uppercase tracking-widest -mt-2">Dassi Maison Marchande</span>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">Célébration des racines souveraines et de l&#39;alchimie botanique d&#39;Afrique. Une liqueur d&#39;exception née de la rencontre entre le savoir ancestral et la haute distillation contemporaine.</p>
            <div className="mt-2"><SocialIcons className="flex gap-4" iconSize="w-5 h-5" /></div>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest">Maison &amp; Découverte</span>
            <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <li><Link to="/#manifeste" className="hover:text-primary transition-colors">L&#39;Esprit AYOYA</Link></li>
              <li><Link to="/#racine" className="hover:text-primary transition-colors">La Racine Sacrée</Link></li>
              <li><Link to="/#degustation" className="hover:text-primary transition-colors">Dégustation &amp; Recettes</Link></li>
              <li><Link to="/cart" className="hover:text-primary transition-colors">Commander</Link></li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest">Garanties Privilège</span>
            <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <li className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">verified</span> Cire et cachet d&#39;origine certifiés</li>
              <li className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">local_shipping</span> Transport climatique discret</li>
              <li className="flex items-center gap-1"><span className="material-symbols-outlined text-[16px] text-primary">encrypted</span> Cryptage bancaire souverain</li>
            </ul>
          </div>
          <div className="flex flex-col gap-3">
            <span className="font-label-caps text-label-caps uppercase text-primary tracking-widest">Conciergerie Dédiée</span>
            {contact?.email ? (
              <a href={`mailto:${contact.email}`} className="font-body-sm text-body-sm text-primary hover:text-primary-fixed inline-flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">mail</span> {contact.email}</a>
            ) : (
              <a href="mailto:conciergerie@dassi-marchande.com" className="font-body-sm text-body-sm text-primary hover:text-primary-fixed inline-flex items-center gap-1"><span className="material-symbols-outlined text-[16px]">mail</span> conciergerie@dassi-marchande.com</a>
            )}
            {contact?.phone && <a href={`tel:${contact.phone}`} className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary">{contact.phone}</a>}
            <div className="flex gap-4 pt-2">
              <Link to="/cgu" className="font-label-caps text-label-caps text-outline hover:text-primary uppercase">CGU</Link>
              <Link to="/cgv" className="font-label-caps text-label-caps text-outline hover:text-primary uppercase">CGV</Link>
            </div>
          </div>
        </div>
        <div className="border-t border-primary/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="font-body-sm text-body-sm text-outline">© 2024 AYOYA. Tous droits réservés. | L&#39;abus d&#39;alcool est dangereux pour la santé</p>
          <Link to="/admin/login" className="font-label-caps text-label-caps text-outline hover:text-primary uppercase">Admin</Link>
        </div>
      </div>
    </footer>
  )
}
