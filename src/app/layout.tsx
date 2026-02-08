

import './globals.css'
import { SUSE } from 'next/font/google';
import RoleGuardProvider from './providers/RoleGuardProvider';
import Footer from '@/components/Footer';

const lora = SUSE({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-suse',
  display: 'swap',
});


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={`${lora.className}`}>
      <head>

      </head>
      <body>
        <RoleGuardProvider>

          {children}
          <Footer/>
        </RoleGuardProvider>

      </body>
    </html>
  );
}
