import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  const navLinks = [
    { label: `L\u2019Esprit`, href: isHome ? '#manifeste' : '/#manifeste' },
    { label: `D\u00E9gustation`, href: isHome ? '#degustation' : '/#degustation' },
    { label: `Racine`, href: isHome ? '#racine' : '/#racine' },
    { label: `Bouteille`, href: isHome ? '#commander' : '/#commander' },
    { label: `Commander`, href: '/cart' },
  ]

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/80 backdrop-blur-xl border-b border-primary/10 shadow-[0_1px_8px_rgba(0,0,0,0.12)]">
      <div className="h-20 max-w-[78rem] mx-auto px-4 lg:px-8 flex items-center justify-between gap-4">
        <Link to="/" className="flex flex-col group shrink-0">
          <span className="font-headline-sm text-headline-sm tracking-[0.12em] text-primary group-hover:text-primary-fixed transition-colors duration-300">AYOYA</span>
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase -mt-1 tracking-[0.18em]">Noblesse Africaine</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            l.href.startsWith('/cart') ? (
              <Link key={l.label} to={l.href} className="font-label-caps text-label-caps uppercase text-on-surface-variant hover:text-primary transition-colors duration-200">
                {l.label}
              </Link>
            ) : (
              <a key={l.label} href={l.href} className="font-label-caps text-label-caps uppercase text-on-surface-variant hover:text-primary transition-colors duration-200">
                {l.label}
              </a>
            )
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/cart"
            className="hidden sm:inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary hover:bg-primary-fixed text-on-primary font-label-caps text-label-caps uppercase rounded-lg shadow-lg shadow-primary/20 transition-all duration-300"
          >
            Commander
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 text-on-surface"
            aria-label="Menu"
          >
            <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-primary/10 bg-surface px-4 py-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex flex-col gap-1">
            {navLinks.map((l) => (
              l.href.startsWith('/cart') ? (
                <Link key={l.label} to={l.href} onClick={() => setMenuOpen(false)} className="font-label-caps text-label-caps uppercase text-on-surface-variant hover:text-primary py-2">
                  {l.label}
                </Link>
              ) : (
                <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} className="font-label-caps text-label-caps uppercase text-on-surface-variant hover:text-primary py-2">
                  {l.label}
                </a>
              )
            ))}
            <Link to="/cart" onClick={() => setMenuOpen(false)} className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-on-primary font-label-caps text-label-caps uppercase rounded-lg">
              Commander — 5 000 FCFA
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
