'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import LogoImage from '@/components/LogoImage'

const links = [
  { href: '#servicos', label: 'Serviços' },
  { href: '#sobre', label: 'Sobre' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#localizacao', label: 'Localização' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-obsidian/95 backdrop-blur-md border-b border-gold/10 py-3'
          : 'bg-transparent py-6'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <LogoImage className="w-12 h-12 drop-shadow-[0_0_8px_rgba(201,168,76,0.4)]" />
          <div className="leading-none">
            <span className="block font-serif text-base font-bold text-cream tracking-wider">O GUGA</span>
            <span className="block font-sans text-[10px] text-gold tracking-[0.3em] uppercase">Barbearia</span>
          </div>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="nav-link">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/marcacoes" className="btn-gold text-xs">
            Marcar Agora
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-cream hover:text-gold transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-obsidian/98 border-t border-gold/10 px-6 py-6 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-sans text-sm tracking-widest uppercase text-cream-muted hover:text-gold transition-colors py-1"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </a>
          ))}
          <Link href="/marcacoes" className="btn-gold text-xs mt-2 justify-center" onClick={() => setOpen(false)}>
            Marcar Agora
          </Link>
        </div>
      </div>
    </header>
  )
}
