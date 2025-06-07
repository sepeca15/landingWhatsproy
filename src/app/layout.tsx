import './globals.css';
import { CartProvider } from '../context/CartContext';
import {
  Funnel_Sans

} from 'next/font/google';
import { Bebas_Neue, Inter } from 'next/font/google';

// Título en mayúsculas
const bebas = Bebas_Neue({ subsets: ['latin'], weight: '400' });
// Texto general
const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Mi Landing Empresarial',
  description: 'Landing para mostrar datos de la empresa, productos y enlace a WhatsApp',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${inter.className} min-h-screen text-gray-800`}>
      <div className=''>
          <CartProvider>
            {children}
          </CartProvider>
        </div>
      </body>
    </html>
  );

}
