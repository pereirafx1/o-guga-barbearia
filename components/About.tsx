import { Award, Users, Clock, MapPin } from 'lucide-react'
import Link from 'next/link'

const highlights = [
  { icon: Award, label: 'Qualidade Premium', desc: 'Produtos e técnicas de excelência' },
  { icon: Users, label: 'Equipa Especializada', desc: 'Barbeiros com anos de experiência' },
  { icon: Clock, label: 'Horário Alargado', desc: 'Seg–Sáb: 9h–19h' },
  { icon: MapPin, label: 'Centro de Setúbal', desc: 'Praça Marquês de Pombal 26' },
]

export default function About() {
  return (
    <section id="sobre" className="py-28 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #111111 0%, #0C0C0C 100%)' }}>
      {/* Decorative vertical line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold/8 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — text */}
          <div>
            <span className="font-sans text-xs tracking-[0.4em] uppercase text-gold">A Nossa História</span>
            <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mt-3 mb-6 leading-tight">
              Tradição e Arte<br />
              <span className="italic font-normal text-gold-light">em cada corte</span>
            </h2>
            <div className="w-12 h-px bg-gold/60 mb-6" />

            <p className="font-sans text-cream-muted text-sm md:text-base leading-relaxed mb-4">
              Fundada no coração de Setúbal, a <strong className="text-cream font-medium">Barbearia O Guga</strong> nasceu
              da paixão pelo ofício do barbeiro tradicional. Com mais de uma década de experiência,
              tornámo-nos numa referência de qualidade e confiança para os homens de Setúbal e arredores.
            </p>
            <p className="font-sans text-cream-muted text-sm md:text-base leading-relaxed mb-8">
              Aqui não existe pressa — cada cliente é tratado com atenção individual, num ambiente
              acolhedor que conjuga o charme da barbearia clássica com o conforto do espaço moderno.
            </p>

            <Link href="/marcacoes" className="btn-gold inline-flex">
              Fazer Marcação
            </Link>
          </div>

          {/* Right — highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((h) => {
              const Icon = h.icon
              return (
                <div key={h.label} className="card-dark p-6 flex items-start gap-4">
                  <div className="w-10 h-10 border border-gold/30 flex-shrink-0 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <div className="font-serif text-base font-semibold text-cream mb-1">{h.label}</div>
                    <div className="font-sans text-xs text-cream-muted leading-relaxed">{h.desc}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
