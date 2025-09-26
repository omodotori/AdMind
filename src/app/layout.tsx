import type { Metadata } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";

const fontSans = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-body',
});

const fontHeadline = Manrope({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-headline',
});

export const metadata: Metadata = {
  title: 'AdMind: AI Marketing Assistant',
  description: 'Generate marketing strategies, social media content, banners, and video scripts with AI.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark" style={{colorScheme: 'dark'}}>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
          fontHeadline.variable
        )}
      >
        <div className="fixed inset-0 -z-10 h-full w-full bg-background bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
