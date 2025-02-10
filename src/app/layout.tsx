import './globals.css';

export const metadata = {
  title: 'Mi Landing Empresarial',
  description: 'Landing para mostrar datos de la empresa, productos y enlace a WhatsApp',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="min-h-screen bg-gray-50 text-gray-800">
        {children}
      </body>
    </html>
  );
}
