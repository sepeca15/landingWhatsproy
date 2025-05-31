import './globals.css';
import { CartProvider } from '../context/CartContext';
import { Funnel_Sans

} from 'next/font/google';

const griffy = Funnel_Sans({ subsets: ['latin'], weight: ['400', '400'] });

export const metadata = {
  title: 'Mi Landing Empresarial',
  description: 'Landing para mostrar datos de la empresa, productos y enlace a WhatsApp',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={griffy.className + " min-h-screen text-gray-800"}>
        <div className=''>
          <CartProvider>
            {children}
          </CartProvider>
        </div>
      </body>
    </html>
  );
  
}
