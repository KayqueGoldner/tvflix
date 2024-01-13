import type { Metadata } from 'next'
import NextTopLoader from 'nextjs-toploader';

import Sidebar from '@/components/sidebar/sidebar'
import Header from '../components/header'
import './globals.css'
import { QueryProvider } from '@/components/providers/query-provider';


export const metadata: Metadata = {
  title: {
    template: "%s | Tvflix",
    default: "Tvflix"
  },
  description: 'developed by Kayque Goldner',
  icons: {
    icon: "/favicon.svg"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body className='bg-outline max-w-[1440px] mx-auto'>
        <QueryProvider>
          <NextTopLoader
            color="#d80725"
            height={3}
            crawl={true}
            speed={300}
            shadow="0 0 10px #d80725"
            showSpinner={false}
          />
          <Header />
          <div className='flex scope overflow-hidden'>
            <div className='lg:block hidden w-[250px] shrink-0'>
              <Sidebar />
            </div>
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  )
}
