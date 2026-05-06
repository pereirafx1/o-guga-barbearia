import { promises as fs } from 'fs'
import path from 'path'

const DATA_FILE = path.join(process.cwd(), 'data', 'marcacoes.json')

export interface Marcacao {
  id: string
  nome: string
  telefone: string
  email: string
  servico: string
  data: string
  hora: string
  notas?: string
  estado: 'pendente' | 'confirmado' | 'cancelado'
  criadoEm: string
}

export async function getMarcacoes(): Promise<Marcacao[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf-8')
    return JSON.parse(raw) as Marcacao[]
  } catch {
    return []
  }
}

export async function saveMarcacao(data: Omit<Marcacao, 'id' | 'estado' | 'criadoEm'>): Promise<Marcacao> {
  const marcacoes = await getMarcacoes()
  const nova: Marcacao = {
    ...data,
    id: `m_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    estado: 'pendente',
    criadoEm: new Date().toISOString(),
  }
  marcacoes.push(nova)
  await fs.writeFile(DATA_FILE, JSON.stringify(marcacoes, null, 2), 'utf-8')
  return nova
}

export async function updateMarcacaoEstado(
  id: string,
  estado: Marcacao['estado']
): Promise<Marcacao | null> {
  const marcacoes = await getMarcacoes()
  const idx = marcacoes.findIndex((m) => m.id === id)
  if (idx === -1) return null
  marcacoes[idx].estado = estado
  await fs.writeFile(DATA_FILE, JSON.stringify(marcacoes, null, 2), 'utf-8')
  return marcacoes[idx]
}

export async function deleteMarcacao(id: string): Promise<boolean> {
  const marcacoes = await getMarcacoes()
  const filtered = marcacoes.filter((m) => m.id !== id)
  if (filtered.length === marcacoes.length) return false
  await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2), 'utf-8')
  return true
}
