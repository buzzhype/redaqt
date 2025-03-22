import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'RedaQt - Document Management Platform',
  description: 'Secure, efficient document management with RedaQt',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}