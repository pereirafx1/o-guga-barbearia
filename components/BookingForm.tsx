'use client'

import { useState } from 'react'
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react'

const SERVICOS = [
  'Corte Clássico',
  'Barba Completa',
  'Corte + Barba',
  'Corte Degradê',
  'Tratamento Capilar',
  'Sobrancelhas',
]

const HORAS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
]

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function BookingForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({
    nome: '',
    telefone: '',
    servico: '',
    data: '',
    hora: '',
    notas: '',
  })

  const today = new Date().toISOString().split('T')[0]

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/marcacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Erro ao submeter marcação')
      }

      setStatus('success')
      setForm({ nome: '', telefone: '', servico: '', data: '', hora: '', notas: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Erro desconhecido')
    }
  }

  if (status === 'success') {
    return (
      <div className="card-dark p-12 flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 border border-gold/40 flex items-center justify-center mb-2">
          <CheckCircle className="w-8 h-8 text-gold" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-cream">Marcação Recebida!</h3>
        <p className="font-sans text-sm text-cream-muted max-w-sm leading-relaxed">
          Recebemos o seu pedido de marcação. Entraremos em contacto brevemente para confirmar.
          Obrigado pela sua preferência!
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="btn-outline text-xs mt-4"
        >
          Fazer Nova Marcação
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="card-dark p-8 md:p-10">
      <h2 className="font-serif text-2xl font-bold text-cream mb-1">Dados da Marcação</h2>
      <p className="font-sans text-xs text-cream-muted mb-8">* Campos obrigatórios</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {/* Nome */}
        <div className="sm:col-span-2">
          <label className="block font-sans text-[10px] tracking-widest uppercase text-gold mb-2">
            Nome Completo *
          </label>
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
            placeholder="O seu nome"
            className="input-dark"
          />
        </div>

        {/* Telefone */}
        <div className="sm:col-span-2">
          <label className="block font-sans text-[10px] tracking-widest uppercase text-gold mb-2">
            Telefone *
          </label>
          <input
            type="tel"
            name="telefone"
            value={form.telefone}
            onChange={handleChange}
            required
            placeholder="+351 9XX XXX XXX"
            className="input-dark"
          />
        </div>

        {/* Serviço */}
        <div className="sm:col-span-2">
          <label className="block font-sans text-[10px] tracking-widest uppercase text-gold mb-2">
            Serviço *
          </label>
          <select
            name="servico"
            value={form.servico}
            onChange={handleChange}
            required
            className="input-dark appearance-none cursor-pointer"
          >
            <option value="" disabled>Escolha um serviço</option>
            {SERVICOS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Data */}
        <div>
          <label className="block font-sans text-[10px] tracking-widest uppercase text-gold mb-2">
            Data *
          </label>
          <input
            type="date"
            name="data"
            value={form.data}
            onChange={handleChange}
            required
            min={today}
            className="input-dark"
          />
        </div>

        {/* Hora */}
        <div>
          <label className="block font-sans text-[10px] tracking-widest uppercase text-gold mb-2">
            Hora *
          </label>
          <select
            name="hora"
            value={form.hora}
            onChange={handleChange}
            required
            className="input-dark appearance-none cursor-pointer"
          >
            <option value="" disabled>Escolha uma hora</option>
            {HORAS.map((h) => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </div>

        {/* Notas */}
        <div className="sm:col-span-2">
          <label className="block font-sans text-[10px] tracking-widest uppercase text-gold mb-2">
            Notas Adicionais
          </label>
          <textarea
            name="notas"
            value={form.notas}
            onChange={handleChange}
            rows={3}
            placeholder="Algum pedido especial ou informação adicional..."
            className="input-dark resize-none"
          />
        </div>
      </div>

      {status === 'error' && (
        <div className="mt-4 flex items-center gap-2 text-red-400 bg-red-900/20 border border-red-900/40 px-4 py-3">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span className="font-sans text-xs">{errorMsg}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn-gold w-full justify-center mt-8 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            A enviar...
          </>
        ) : (
          'Confirmar Marcação'
        )}
      </button>

      <p className="font-sans text-[10px] text-cream-muted text-center mt-4">
        Após o envio, receberá confirmação por telefone.
      </p>
    </form>
  )
}
