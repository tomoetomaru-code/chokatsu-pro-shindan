import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '腸内タイプ本格診断 | くるみ｜腸からやせる研究所',
  description: '30問・8分でわかる本格腸内タイプ診断アプリ',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
