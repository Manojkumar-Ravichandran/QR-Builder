import './globals.css';
import ReduxProvider from '@/providers/ReduxProvider';

export const metadata = {
  title: 'QR Master',
  description: 'Smart QR Code Generator',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
