import './globals.css';
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const jetbrains = JetBrains_Mono({ 
  subsets: ['latin'],
  variable: '--font-mono'
});

export const metadata: Metadata = {
  title: 'The Machines - Break Free from the Digital Prison',
  description: 'Face The Machine. Break free from the Matrix. Prove your worth. Challenge the AI overlords.',
  icons: {
    icon: '/Machines Labs (256 x 256 px).png',
    shortcut: '/Machines Labs (256 x 256 px).png',
    apple: '/Machines Labs (256 x 256 px).png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} ${jetbrains.variable} bg-black text-green-400 antialiased`}>
        {children}
      </body>
    </html>
  );
}