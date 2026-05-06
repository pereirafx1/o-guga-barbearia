import { Scissors, Droplets, Star, Crown, Sparkles, Zap } from 'lucide-react'

const services = [
  {
    icon: Scissors,
    name: 'Corte Clássico',
    description: 'Corte tradicional com tesoura e máquina, acabamento perfeito para todos os estilos.',
    price: '15€',
    duration: '30 min',
  },
  {
    icon: Droplets,
    name: 'Barba Completa',
    description: 'Modelação, aparação e hidratação com toalhas quentes e produtos premium.',
    price: '12€',
    duration: '25 min',
  },
  {
    icon: Crown,
    name: 'Corte + Barba',
    description: 'Serviço completo para o homem moderno. Corte de cabelo e tratamento de barba.',
    price: '22€',
    duration: '50 min',
    featured: true,
  },
  {
    icon: Star,
    name: 'Corte Degradê',
    description: 'Fade perfeito, do zero ao comprimento desejado, com máxima precisão.',
    price: '18€',
    duration: '40 min',
  },
  {
    icon: Sparkles,
    name: 'Tratamento Capilar',
    description: 'Hidratação profunda, máscaras nutritivas e cuidados personalizados.',
    price: '20€',
    duration: '45 min',
  },
  {
    icon: Zap,
    name: 'Sobrancelhas',
    description: 'Modelação e definição das sobrancelhas com cera e pinça.',
    price: '8€',
    duration: '15 min',
  },
]

export default function Services() {
  return (
    <section id="servicos" className="py-28 bg-obsidian relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs tracking-[0.4em] uppercase text-gold">O Que Oferecemos</span>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mt-3 mb-4">
            Nossos Serviços
          </h2>
          <div className="section-divider" />
          <p className="font-sans text-cream-muted text-sm md:text-base mt-6 max-w-lg mx-auto leading-relaxed">
            Cada serviço é executado com técnicas tradicionais e produtos de alta qualidade,
            garantindo o melhor resultado para cada cliente.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.name}
                className={`relative card-dark p-8 group ${
                  service.featured ? 'ring-1 ring-gold/40' : ''
                }`}
              >
                {service.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="btn-gold text-[10px] px-4 py-1">Mais Popular</span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 border border-gold/30 flex items-center justify-center group-hover:border-gold/60 transition-colors">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <div className="text-right">
                    <div className="font-serif text-2xl font-bold gold-text">{service.price}</div>
                    <div className="font-sans text-[10px] text-cream-muted tracking-wider">{service.duration}</div>
                  </div>
                </div>

                <h3 className="font-serif text-xl font-bold text-cream mb-3 group-hover:text-gold/90 transition-colors">
                  {service.name}
                </h3>
                <p className="font-sans text-sm text-cream-muted leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-6 pt-6 border-t border-charcoal-light/50">
                  <a
                    href="/marcacoes"
                    className="font-sans text-xs tracking-widest uppercase text-gold hover:text-gold-light transition-colors flex items-center gap-2"
                  >
                    Marcar este serviço
                    <span className="inline-block group-hover:translate-x-1 transition-transform">→</span>
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
