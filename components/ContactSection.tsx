import { Phone, Mail, Instagram, Facebook } from 'lucide-react'

export default function ContactSection() {
  return (
    <section id="contacto" className="py-24 relative" style={{ background: 'linear-gradient(180deg, #0C0C0C 0%, #111 100%)' }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="font-sans text-xs tracking-[0.4em] uppercase text-gold">Fale Connosco</span>
        <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mt-3 mb-4">
          Contacto
        </h2>
        <div className="section-divider mb-8" />
        <p className="font-sans text-cream-muted text-sm md:text-base leading-relaxed mb-12 max-w-lg mx-auto">
          Para marcações, informações ou simplesmente para nos dizer olá.
          Estamos sempre disponíveis para si.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a href="tel:+351265000000" className="btn-gold">
            <Phone className="w-4 h-4" />
            Ligar Agora
          </a>
          <a href="mailto:guga@barbeariaguga.pt" className="btn-outline">
            <Mail className="w-4 h-4" />
            Enviar Email
          </a>
        </div>

        {/* Social */}
        <div className="flex items-center justify-center gap-6">
          <span className="font-sans text-xs tracking-widest uppercase text-cream-muted">Redes Sociais</span>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 border border-charcoal-light flex items-center justify-center text-cream-muted hover:border-gold hover:text-gold transition-all"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
            <a
              href="#"
              className="w-10 h-10 border border-charcoal-light flex items-center justify-center text-cream-muted hover:border-gold hover:text-gold transition-all"
              aria-label="Facebook"
            >
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
