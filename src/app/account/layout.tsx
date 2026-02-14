import { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Account • NordLion Private Desk',
  description: 'Your private desk for passion asset management',
}

export default function AccountLayout({
  children,
}: {
  children: ReactNode
}) {
  return children
}
