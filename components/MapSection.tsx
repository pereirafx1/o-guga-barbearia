import { MapPin, Phone, Clock } from 'lucide-react'

// Praça Marquês de Pombal 26, 2900-562 Setúbal — 38.5244° N, -8.8882° W
// !1f45  → tilt 45°  |  !5e1 → satellite imagery  |  !1d300 → close zoom for 3D buildings
const MAPS_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d300!2d-8.8882!3d38.5244!2m3!1f45!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd194a22f2d5f0c3%3A0x5c3b6e3e6f2a1b4a!2sPra%C3%A7a%20Marqu%C3%AAs%20de%20Pombal%2026%2C%202900-562%20Set%C3%BAbal!5e1!3m2!1spt!2spt!4v1746550000000!5m2!1spt!2spt'

const info = [
  {
    icon: MapPin,
    label: 'Morada',
    value: 'Praça Marquês de Pombal 26\n2900-562 Setúbal',
  },
  {
    icon: Phone,
    label: 'Telefone',
    value: '+351 265 000 000',
    href: 'tel:+351265000000',
  },
  {
    icon: Clock,
    label: 'Horário',
    value: 'Seg–Sex: 9h–19h\nSábado: 9h–18h\nDomingo: Fechado',
  },
]

export default function MapSection() {
  return (
    <section id="localizacao" className="py-28 bg-obsidian relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs tracking-[0.4em] uppercase text-gold">Onde Estamos</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mt-3 mb-4">
            Localização
          </h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Info cards */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            {info.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="card-dark p-5 flex items-start gap-4">
                  <div className="w-9 h-9 border border-gold/30 flex-shrink-0 flex items-center justify-center mt-0.5">
                    <Icon className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <div className="font-sans text-[10px] tracking-widest uppercase text-gold mb-1">
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-sans text-sm text-cream hover:text-gold transition-colors whitespace-pre-line"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-sans text-sm text-cream-muted whitespace-pre-line leading-relaxed">
                        {item.value}
                      </p>
                    )}
                  </div>
                </div>
              )
            })}

            <a
              href="https://maps.google.com/?q=Praça+Marquês+de+Pombal+26,+2900-562+Setúbal"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline text-xs justify-center mt-2"
            >
              <MapPin className="w-4 h-4" />
              Abrir no Google Maps
            </a>
          </div>

          {/* Map embed */}
          <div className="lg:col-span-2 relative overflow-hidden" style={{ minHeight: '400px' }}>
            {/* Gold border frame */}
            <div className="absolute inset-0 border border-gold/20 z-10 pointer-events-none" />

            <iframe
              src={MAPS_EMBED_URL}
              width="100%"
              height="100%"
              style={{
                border: 0,
                display: 'block',
                minHeight: '400px',
                filter: 'grayscale(1) invert(0.9) hue-rotate(180deg)',
              }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Localização da Barbearia O Guga"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
