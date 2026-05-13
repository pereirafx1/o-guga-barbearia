import { NextRequest, NextResponse } from 'next/server'
import { getMarcacoes } from '@/lib/marcacoes'

export async function GET(request: NextRequest) {
  const data = request.nextUrl.searchParams.get('data')
  if (!data) {
    return NextResponse.json({ error: 'Parâmetro data obrigatório' }, { status: 400 })
  }

  const marcacoes = await getMarcacoes()

  // Return hours already taken for this date (exclude cancelled bookings)
  const horasOcupadas = marcacoes
    .filter((m) => m.data === data && m.estado !== 'cancelado')
    .map((m) => m.hora)

  return NextResponse.json({ horasOcupadas })
}
