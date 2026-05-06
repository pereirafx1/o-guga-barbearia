'use client'

import { useState, useEffect, useCallback } from 'react'
import { Lock, LogOut, RefreshCw, Trash2, CheckCircle, XCircle, Clock, Loader2, Scissors } from 'lucide-react'
import type { Marcacao } from '@/lib/marcacoes'

type FilterEstado = 'todos' | Marcacao['estado']

const ESTADO_LABELS: Record<Marcacao['estado'], string> = {
  pendente: 'Pendente',
  confirmado: 'Confirmado',
  cancelado: 'Cancelado',
}

const ESTADO_COLORS: Record<Marcacao['estado'], string> = {
  pendente: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/5',
  confirmado: 'text-green-400 border-green-400/30 bg-green-400/5',
  cancelado: 'text-red-400 border-red-400/30 bg-red-400/5',
}

export default function AdminDashboard() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [authError, setAuthError] = useState(false)
  const [marcacoes, setMarcacoes] = useState<Marcacao[]>([])
  const [loading, setLoading] = useState(false)
  const [filter, setFilter] = useState<FilterEstado>('todos')
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const fetchMarcacoes = useCallback(async (pwd: string) => {
    setLoading(true)
    try {
      const res = await fetch('/api/marcacoes', {
        headers: { 'x-admin-key': pwd },
      })
      if (res.status === 401) {
        setAuthed(false)
        return
      }
      const data = await res.json()
      setMarcacoes(data)
    } finally {
      setLoading(false)
    }
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setAuthError(false)
    // Try fetching with the password — if 401, it's wrong
    const res = await fetch('/api/marcacoes', {
      headers: { 'x-admin-key': password },
    })
    if (res.status === 401) {
      setAuthError(true)
      return
    }
    const data = await res.json()
    setMarcacoes(data)
    setAuthed(true)
  }

  const handleEstado = async (id: string, estado: Marcacao['estado']) => {
    setActionLoading(id + estado)
    try {
      const res = await fetch(`/api/marcacoes/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'x-admin-key': password,
        },
        body: JSON.stringify({ estado }),
      })
      if (res.ok) {
        const updated = await res.json()
        setMarcacoes((prev) => prev.map((m) => (m.id === id ? updated : m)))
      }
    } finally {
      setActionLoading(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Tem a certeza que pretende eliminar esta marcação?')) return
    setActionLoading(id + 'delete')
    try {
      const res = await fetch(`/api/marcacoes/${id}`, {
        method: 'DELETE',
        headers: { 'x-admin-key': password },
      })
      if (res.ok) {
        setMarcacoes((prev) => prev.filter((m) => m.id !== id))
      }
    } finally {
      setActionLoading(null)
    }
  }

  const filtered = filter === 'todos' ? marcacoes : marcacoes.filter((m) => m.estado === filter)

  const counts = {
    todos: marcacoes.length,
    pendente: marcacoes.filter((m) => m.estado === 'pendente').length,
    confirmado: marcacoes.filter((m) => m.estado === 'confirmado').length,
    cancelado: marcacoes.filter((m) => m.estado === 'cancelado').length,
  }

  // Login screen
  if (!authed) {
    return (
      <div className="min-h-screen bg-obsidian flex items-center justify-center px-6">
        <div className="w-full max-w-sm">
          {/* Logo */}
          <div className="text-center mb-10">
            <div className="w-14 h-14 border border-gold/40 flex items-center justify-center mx-auto mb-4">
              <Scissors className="w-6 h-6 text-gold" />
            </div>
            <h1 className="font-serif text-2xl font-bold text-cream">O Guga Barbearia</h1>
            <p className="font-sans text-xs text-cream-muted tracking-widest uppercase mt-1">Painel de Administração</p>
          </div>

          <form onSubmit={handleLogin} className="card-dark p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 border border-gold/30 flex items-center justify-center">
                <Lock className="w-3.5 h-3.5 text-gold" />
              </div>
              <h2 className="font-serif text-lg font-semibold text-cream">Acesso Restrito</h2>
            </div>

            <label className="block font-sans text-[10px] tracking-widest uppercase text-gold mb-2">
              Palavra-passe
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                setAuthError(false)
              }}
              placeholder="••••••••"
              required
              autoFocus
              className={`input-dark mb-1 ${authError ? 'border-red-500/60' : ''}`}
            />
            {authError && (
              <p className="font-sans text-xs text-red-400 mt-2 mb-4">Palavra-passe incorreta.</p>
            )}

            <button type="submit" className="btn-gold w-full justify-center mt-6">
              <Lock className="w-4 h-4" />
              Entrar
            </button>
          </form>
        </div>
      </div>
    )
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-obsidian pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold text-cream">
              Painel <span className="gold-text">Admin</span>
            </h1>
            <p className="font-sans text-xs text-cream-muted mt-1">Barbearia O Guga · Gestão de Marcações</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => fetchMarcacoes(password)}
              className="w-9 h-9 border border-charcoal-light flex items-center justify-center text-cream-muted hover:border-gold hover:text-gold transition-all"
              title="Atualizar"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={() => { setAuthed(false); setPassword('') }}
              className="flex items-center gap-2 btn-outline text-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sair
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {([
            { key: 'todos', label: 'Total', icon: Clock },
            { key: 'pendente', label: 'Pendentes', icon: Clock },
            { key: 'confirmado', label: 'Confirmados', icon: CheckCircle },
            { key: 'cancelado', label: 'Cancelados', icon: XCircle },
          ] as const).map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={`card-dark p-5 text-left transition-all ${
                filter === key ? 'ring-1 ring-gold/50' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-sans text-[10px] tracking-widest uppercase text-cream-muted">{label}</span>
                <Icon className={`w-4 h-4 ${filter === key ? 'text-gold' : 'text-cream-muted/50'}`} />
              </div>
              <div className="font-serif text-3xl font-bold gold-text">{counts[key]}</div>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="card-dark overflow-hidden">
          <div className="p-6 border-b border-charcoal-light/40">
            <h2 className="font-serif text-xl font-semibold text-cream">
              Marcações{filter !== 'todos' ? ` — ${ESTADO_LABELS[filter as Marcacao['estado']]}` : ''}
            </h2>
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 text-gold animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-sans text-sm text-cream-muted">Nenhuma marcação encontrada.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-charcoal-light/40">
                    {['Nome', 'Telefone', 'Serviço', 'Data / Hora', 'Estado', 'Ações'].map((h) => (
                      <th
                        key={h}
                        className="text-left font-sans text-[10px] tracking-widest uppercase text-gold px-6 py-4"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered
                    .slice()
                    .sort((a, b) => new Date(b.criadoEm).getTime() - new Date(a.criadoEm).getTime())
                    .map((m) => (
                      <tr
                        key={m.id}
                        className="border-b border-charcoal-light/20 hover:bg-charcoal/30 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="font-sans text-sm font-medium text-cream">{m.nome}</div>
                          <div className="font-sans text-xs text-cream-muted mt-0.5">
                            {new Date(m.criadoEm).toLocaleDateString('pt-PT')}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-sans text-xs text-cream">{m.telefone}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-sans text-xs text-cream">{m.servico}</span>
                          {m.notas && (
                            <div className="font-sans text-xs text-cream-muted mt-0.5 max-w-32 truncate" title={m.notas}>
                              {m.notas}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-sans text-sm text-cream">
                            {new Date(m.data).toLocaleDateString('pt-PT', {
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            })}
                          </div>
                          <div className="font-sans text-xs text-cream-muted">{m.hora}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-block font-sans text-[10px] tracking-wider uppercase border px-2.5 py-1 ${ESTADO_COLORS[m.estado]}`}
                          >
                            {ESTADO_LABELS[m.estado]}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {m.estado !== 'confirmado' && (
                              <button
                                onClick={() => handleEstado(m.id, 'confirmado')}
                                disabled={actionLoading !== null}
                                className="w-7 h-7 border border-green-500/40 flex items-center justify-center text-green-400 hover:border-green-400 hover:bg-green-400/10 transition-all disabled:opacity-40"
                                title="Confirmar"
                              >
                                {actionLoading === m.id + 'confirmado' ? (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                ) : (
                                  <CheckCircle className="w-3 h-3" />
                                )}
                              </button>
                            )}
                            {m.estado !== 'cancelado' && (
                              <button
                                onClick={() => handleEstado(m.id, 'cancelado')}
                                disabled={actionLoading !== null}
                                className="w-7 h-7 border border-red-500/40 flex items-center justify-center text-red-400 hover:border-red-400 hover:bg-red-400/10 transition-all disabled:opacity-40"
                                title="Cancelar"
                              >
                                {actionLoading === m.id + 'cancelado' ? (
                                  <Loader2 className="w-3 h-3 animate-spin" />
                                ) : (
                                  <XCircle className="w-3 h-3" />
                                )}
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(m.id)}
                              disabled={actionLoading !== null}
                              className="w-7 h-7 border border-charcoal-light flex items-center justify-center text-cream-muted hover:border-red-500/50 hover:text-red-400 transition-all disabled:opacity-40"
                              title="Eliminar"
                            >
                              {actionLoading === m.id + 'delete' ? (
                                <Loader2 className="w-3 h-3 animate-spin" />
                              ) : (
                                <Trash2 className="w-3 h-3" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
