export const metadata = {
  title: 'CortaAI',
  description: 'Gerador de cortes com IA',
}

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body style={{margin: 0, background: '#0a0a0a'}}>{children}</body>
    </html>
  )
}