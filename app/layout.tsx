import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './providers';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Rohit Sampannavar - iOS Developer',
  description: 'Interactive portfolio website showcasing my projects, experience, and skills as a full-stack developer.',
  keywords: 'developer, portfolio, full-stack, react, next.js, typescript',
  authors: [{ name: 'Rohit Sampannavar' }],
  openGraph: {
    title: 'Rohit Sampannavar - iOS Developer',
    description: 'Interactive portfolio website showcasing my projects and experience.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}