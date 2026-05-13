import { NextRequest, NextResponse } from 'next/server'
import { updateMarcacaoEstado, deleteMarcacao } from '@/lib/marcacoes'

function isAuthorized(request: NextRequest) {
  const authHeader = request.headers.get('x-admin-key')
  const adminPassword = process.env.ADMIN_PASSWORD ?? 'guga2024'
  return !!authHeader && authHeader === adminPassword
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const body = await request.json()
  const { estado } = body

  if (!['pendente', 'confirmado', 'cancelado'].includes(estado)) {
    return NextResponse.json({ error: 'Estado inválido' }, { status: 400 })
  }

  const updated = await updateMarcacaoEstado(params.id, estado)
  if (!updated) {
    return NextResponse.json({ error: 'Marcação não encontrada' }, { status: 404 })
  }

  return NextResponse.json(updated)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const deleted = await deleteMarcacao(params.id)
  if (!deleted) {
    return NextResponse.json({ error: 'Marcação não encontrada' }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
