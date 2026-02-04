import type { Metadata } from 'next';
import { Outfit, Space_Grotesk } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const outfit = Outfit({ 
  subsets: ['latin'], 
  variable: '--font-outfit',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    template: '%s | Nguyen Hoang Thong',
    default: 'Nguyen Hoang Thong • Junior Fullstack Developer',
  },
  description:
    'Junior Fullstack Developer based in Ho Chi Minh City, Vietnam. Building modern web applications and mobile apps with React, Next.js, Node.js, and more.',
  keywords: ['Fullstack Developer', 'React', 'Next.js', 'Node.js', 'Portfolio'],
  authors: [{ name: 'Nguyen Hoang Thong' }],
  creator: 'Nguyen Hoang Thong',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${outfit.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
