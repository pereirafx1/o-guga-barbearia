import type { Metadata } from 'next'
import BookingForm from '@/components/BookingForm'
import { Scissors, Clock, Phone } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Marcações | O Guga Barbearia',
  description: 'Marque a sua consulta na Barbearia O Guga em Setúbal.',
}

export default function MarcacoesPage() {
  return (
    <div className="min-h-screen bg-obsidian pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="font-sans text-xs tracking-[0.4em] uppercase text-gold">Reserve o Seu Lugar</span>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-cream mt-3 mb-4">
            Fazer Marcação
          </h1>
          <div className="section-divider" />
          <p className="font-sans text-cream-muted text-sm md:text-base mt-6 max-w-lg mx-auto leading-relaxed">
            Preencha o formulário abaixo e entraremos em contacto para confirmar a sua marcação.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Info sidebar */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <div className="card-dark p-6">
              <div className="w-10 h-10 border border-gold/30 flex items-center justify-center mb-4">
                <Scissors className="w-4 h-4 text-gold" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-cream mb-2">Serviços Disponíveis</h3>
              <ul className="space-y-1.5">
                {[
                  'Corte Clássico — 15€',
                  'Barba Completa — 12€',
                  'Corte + Barba — 22€',
                  'Corte Degradê — 18€',
                  'Tratamento Capilar — 20€',
                  'Sobrancelhas — 8€',
                ].map((s) => (
                  <li key={s} className="font-sans text-xs text-cream-muted flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-dark p-6">
              <div className="w-10 h-10 border border-gold/30 flex items-center justify-center mb-4">
                <Clock className="w-4 h-4 text-gold" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-cream mb-2">Horário</h3>
              <div className="space-y-1">
                {[
                  { d: 'Segunda a Sexta', h: '9h00 – 19h00' },
                  { d: 'Sábado', h: '9h00 – 18h00' },
                  { d: 'Domingo', h: 'Fechado' },
                ].map((row) => (
                  <div key={row.d} className="flex justify-between items-center">
                    <span className="font-sans text-xs text-cream-muted">{row.d}</span>
                    <span className="font-sans text-xs text-cream">{row.h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="card-dark p-6">
              <div className="w-10 h-10 border border-gold/30 flex items-center justify-center mb-4">
                <Phone className="w-4 h-4 text-gold" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-cream mb-2">Prefere Ligar?</h3>
              <a
                href="tel:+351265000000"
                className="font-sans text-sm text-gold hover:text-gold-light transition-colors"
              >
                +351 265 000 000
              </a>
              <p className="font-sans text-xs text-cream-muted mt-2">
                Disponível nos horários de funcionamento.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            <BookingForm />
          </div>
        </div>
      </div>
    </div>
  )
}
