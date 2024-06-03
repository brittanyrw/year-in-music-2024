import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <h3>Year in Music.</h3>
        <p>Built with Next.js and Contentful.</p>
      </div>
      <div className="footer-link">
        <a href="https://github.com/brittanyrw/storylines-workshop" target="_blank">GitHub</a>
      </div>
    </footer>
  )
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body suppressHydrationWarning={true}>
        <section>
          <main>{children}</main>
          <Footer />
        </section>
      </body>
    </html>
  )
}
