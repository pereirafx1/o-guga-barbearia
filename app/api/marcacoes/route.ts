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

    const marcacao = await saveMarcacao({ nome, telefone, servico, data, hora, notas })
    return NextResponse.json(marcacao, { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
