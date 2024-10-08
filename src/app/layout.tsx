import type { Metadata } from 'next';
import localFont from 'next/font/local';
import TopBar from './components/TopBar';
import { TitleProvider } from './contexts/TitleContext';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Music Theory Cheatsheet',
  description: 'A quick cheatsheet covering the basics for music theory.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <TitleProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
        >
          <TopBar />
          <div className="flex-grow">
            {children}
          </div>
          <footer className="py-4 text-center">
            <p className="text-sm text-gray-600">
              Made by Dimosthenis Kalaitzis, see{' '}
              <a
                href="https://github.com/DimosthenisK/music-cheatsheet"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-600 underline"
              >
                source
              </a>{' '}
              ♥
            </p>
          </footer>
        </body>
      </TitleProvider>
    </html>
  );
}
