import { Star } from 'lucide-react'

const testimonials = [
  {
    name: 'João Ferreira',
    role: 'Cliente Regular',
    text: 'O melhor barbeiro de Setúbal, sem dúvida. O Guga conhece o meu estilo melhor do que eu próprio. Recomendo a toda a gente!',
    stars: 5,
  },
  {
    name: 'Miguel Costa',
    role: 'Cliente há 5 anos',
    text: 'Ambiente fantástico, preços justos e qualidade acima de tudo. Nunca fui a outro sítio desde que descobri a Barbearia O Guga.',
    stars: 5,
  },
  {
    name: 'Rui Mendes',
    role: 'Cliente Satisfeito',
    text: 'Atendimento de primeira, espaço acolhedor e o resultado é sempre impecável. É raro encontrar esta qualidade.',
    stars: 5,
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 relative" style={{ background: 'linear-gradient(180deg, #0C0C0C 0%, #111 50%, #0C0C0C 100%)' }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="font-sans text-xs tracking-[0.4em] uppercase text-gold">Testemunhos</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mt-3 mb-4">
            O Que Dizem
          </h2>
          <div className="section-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="card-dark p-8 flex flex-col gap-4">
              <div className="flex gap-1">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-gold text-gold" />
                ))}
              </div>
              <p className="font-sans text-sm text-cream-muted leading-relaxed italic flex-1">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="border-t border-charcoal-light/40 pt-4">
                <div className="font-serif text-base font-semibold text-cream">{t.name}</div>
                <div className="font-sans text-xs text-gold tracking-wider">{t.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
