import type { Metadata } from 'next';
import { MainLayout } from '@/components/layout';
import './globals.css';

export const metadata: Metadata = {
  title: 'SYNTX | Field Resonance Dashboard',
  description: 'Die visuelle Manifestation des Feld-Paradigmas',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
