import type { Metadata } from 'next'
import AdminDashboard from '@/components/AdminDashboard'

export const metadata: Metadata = {
  title: 'Admin | O Guga Barbearia',
  robots: 'noindex,nofollow',
}

export default function AdminPage() {
  return <AdminDashboard />
}
