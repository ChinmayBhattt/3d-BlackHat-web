import { Cinzel, Outfit } from 'next/font/google';
import './globals.css';

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '600', '700', '900'],
  variable: '--font-cinzel',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata = {
  title: 'KAGE — The Art of Shadow & Motion | Cinematic Experience',
  description: 'An avant-garde cinematic visual studio specializing in noir cinematography, 3D spatial motion, and scroll-driven hat throw experience.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${outfit.variable} dark`}>
      <head>
        <meta name="theme-color" content="#040405" />
      </head>
      <body className="bg-black text-gray-100 antialiased selection:bg-amber-500/30 selection:text-amber-200">
        <div className="film-grain" aria-hidden="true" />
        <div className="ambient-glow" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
