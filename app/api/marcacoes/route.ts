import { NextRequest, NextResponse } from 'next/server'
import { getMarcacoes, saveMarcacao } from '@/lib/marcacoes'

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('x-admin-key')
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'guga2024'
  if (!authHeader || authHeader !== adminPassword) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const marcacoes = await getMarcacoes()
  return NextResponse.json(marcacoes)
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { nome, telefone, servico, data, hora, notas } = body

    if (!nome || !telefone || !servico || !data || !hora) {
      return NextResponse.json(
        { error: 'Campos obrigatórios em falta' },
        { status: 400 }
      )
    }

    // Check for double booking (ignore cancelled)
    const existing = await getMarcacoes()
    const conflict = existing.find(
      (m) => m.data === data && m.hora === hora && m.estado !== 'cancelado'
    )
    if (conflict) {
      return NextResponse.json(
        { error: 'Este horário já está ocupado. Por favor escolha outro.' },
        { status: 409 }
      )
    }

    const marcacao = await saveMarcacao({ nome, telefone, servico, data, hora, notas })
    return NextResponse.json(marcacao, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
