import './globals.css';

export const metadata = {
  title: 'Xentari',
  description: 'AI-Powered Crypto Ecosystem',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}






