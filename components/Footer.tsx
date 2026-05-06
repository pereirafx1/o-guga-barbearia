import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-obsidian border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="O Guga Barbearia"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="block font-serif text-sm font-bold text-cream">O GUGA</span>
                <span className="block font-sans text-[9px] text-gold tracking-[0.3em] uppercase">Barbearia</span>
              </div>
            </div>
            <p className="font-sans text-xs text-cream-muted leading-relaxed">
              Arte, tradição e estilo numa das barbearias mais emblemáticas de Setúbal.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-sans text-[10px] tracking-widest uppercase text-gold mb-4">Navegação</h3>
            <ul className="space-y-2">
              {[
                { href: '#servicos', label: 'Serviços' },
                { href: '#sobre', label: 'Sobre Nós' },
                { href: '#galeria', label: 'Galeria' },
                { href: '#localizacao', label: 'Localização' },
                { href: '/marcacoes', label: 'Marcações' },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-sans text-xs text-cream-muted hover:text-gold transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-sans text-[10px] tracking-widest uppercase text-gold mb-4">Contacto</h3>
            <ul className="space-y-2">
              <li className="font-sans text-xs text-cream-muted">
                Praça Marquês de Pombal 26<br />
                2900-562 Setúbal
              </li>
              <li>
                <a href="tel:+351265000000" className="font-sans text-xs text-cream-muted hover:text-gold transition-colors">
                  +351 265 000 000
                </a>
              </li>
              <li className="font-sans text-xs text-cream-muted mt-3">
                Seg–Sex: 9h–19h<br />
                Sábado: 9h–18h
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gold/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-[10px] text-cream-muted tracking-wider">
            © {new Date().getFullYear()} Barbearia O Guga. Todos os direitos reservados.
          </p>
          <Link
            href="/admin"
            className="font-sans text-[10px] text-cream-muted/40 hover:text-cream-muted/70 transition-colors tracking-wider"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  )
}
