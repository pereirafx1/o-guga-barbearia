import Link from 'next/link'
import { Scissors, ChevronDown } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background pattern */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            radial-gradient(circle at 20% 50%, rgba(201, 168, 76, 0.06) 0%, transparent 60%),
            radial-gradient(circle at 80% 20%, rgba(201, 168, 76, 0.04) 0%, transparent 50%),
            linear-gradient(180deg, #0C0C0C 0%, #111111 50%, #0C0C0C 100%)
          `,
        }}
      />

      {/* Decorative lines */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
        <div className="absolute bottom-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/8 to-transparent" />
        <div
          className="absolute top-0 bottom-0 left-1/2 w-px -translate-x-1/2 opacity-5"
          style={{ background: 'linear-gradient(180deg, transparent, #C9A84C 30%, #C9A84C 70%, transparent)' }}
        />
      </div>

      {/* Corner ornaments */}
      <div className="absolute top-24 left-8 md:left-16 z-0 opacity-20">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M0 0 L60 0 L60 8 M0 0 L0 60 L8 60" stroke="#C9A84C" strokeWidth="1" />
        </svg>
      </div>
      <div className="absolute top-24 right-8 md:right-16 z-0 opacity-20">
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          <path d="M60 0 L0 0 L0 8 M60 0 L60 60 L52 60" stroke="#C9A84C" strokeWidth="1" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-3 mb-8 opacity-0 animate-fade-in" style={{ animationFillMode: 'forwards' }}>
          <span className="h-px w-12 bg-gold/60" />
          <span className="font-sans text-xs tracking-[0.4em] uppercase text-gold">Setúbal · Desde 2010</span>
          <span className="h-px w-12 bg-gold/60" />
        </div>

        {/* Scissors icon */}
        <div
          className="flex justify-center mb-6 opacity-0 animate-fade-in animate-delay-100"
          style={{ animationFillMode: 'forwards' }}
        >
          <div className="w-16 h-16 border border-gold/30 flex items-center justify-center">
            <Scissors className="w-7 h-7 text-gold" />
          </div>
        </div>

        {/* Heading */}
        <h1
          className="font-serif font-black mb-4 opacity-0 animate-fade-up animate-delay-200"
          style={{ animationFillMode: 'forwards' }}
        >
          <span className="block text-5xl md:text-7xl lg:text-8xl text-cream leading-none tracking-tight">
            O GUGA
          </span>
          <span
            className="block text-3xl md:text-5xl lg:text-6xl mt-2 gold-text-shimmer"
            style={{ animationFillMode: 'forwards' }}
          >
            Barbearia
          </span>
        </h1>

        {/* Tagline */}
        <p
          className="font-sans text-cream-muted text-base md:text-lg leading-relaxed max-w-xl mx-auto mt-6 mb-10 opacity-0 animate-fade-up animate-delay-300"
          style={{ animationFillMode: 'forwards' }}
        >
          Arte, tradição e estilo numa das mais emblemáticas barbearias de Setúbal.
          Onde cada corte é uma obra de arte.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-fade-up animate-delay-400"
          style={{ animationFillMode: 'forwards' }}
        >
          <Link href="/marcacoes" className="btn-gold">
            <Scissors className="w-4 h-4" />
            Marcar Consulta
          </Link>
          <a href="#servicos" className="btn-outline">
            Ver Serviços
          </a>
        </div>

        {/* Stats */}
        <div
          className="mt-20 grid grid-cols-3 gap-8 max-w-md mx-auto opacity-0 animate-fade-in animate-delay-500"
          style={{ animationFillMode: 'forwards' }}
        >
          {[
            { value: '14+', label: 'Anos de Experiência' },
            { value: '5K+', label: 'Clientes Satisfeitos' },
            { value: '100%', label: 'Dedicação' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-serif text-2xl md:text-3xl font-bold gold-text">{stat.value}</div>
              <div className="font-sans text-[10px] text-cream-muted tracking-wider uppercase mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#servicos"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-gold/40 hover:text-gold/80 transition-colors"
      >
        <span className="font-sans text-[10px] tracking-widest uppercase">Scroll</span>
        <ChevronDown className="w-4 h-4 animate-bounce" />
      </a>
    </section>
  )
}
