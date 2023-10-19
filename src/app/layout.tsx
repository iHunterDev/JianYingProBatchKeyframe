import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '剪映一键关键帧',
  description: '一键设定剪映视频关键帧，轻松添加转场动画。',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh_CN">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
