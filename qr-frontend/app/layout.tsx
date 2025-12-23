import './globals.css';
import ReduxProvider from '@/providers/ReduxProvider';
import { ToastProvider } from '@/providers/ToastProvider';

export const metadata = {
  title: 'QR Master',
  description: 'Smart QR Code Generator',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
