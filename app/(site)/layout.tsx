import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthContext from '../providers/AuthContext'
import bg from '@/public/bg.png';
import NavBar from '../components/NavBar';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Scrumpoint',
  description: 'Rugby World Cup Tracker',
  icons: {
    icon: '/favicon.ico', // /public path
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en" 
    style={{
      backgroundImage: `url(${bg.src})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
      }}>
        <body className={inter.className}>
            <AuthContext>
                <NavBar>
                  {children}
                </NavBar>
            </AuthContext>
          
        </body>
    </html>
  )
}
