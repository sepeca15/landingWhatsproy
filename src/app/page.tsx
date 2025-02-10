import ProductsSwiper from '../components/ProductsSwiper';
import WhatsAppLink from '../components/WhatsAppLink';

const productoEjemplo = {
  imageUrl: "https://via.placeholder.com/600x400",
  nombre: "Producto Ejemplo",
  precio: 150,
  currency: "USD",
  descripcion: "Esta es una breve descripción del producto. Se muestra en tres líneas y se recorta si es muy larga.",
  disponible: true 
};

const products = Array(6).fill(productoEjemplo);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="relative bg-gradient-to-r from-blue-500 to-teal-400 py-6">
        <div className="container mx-auto text-center px-4">
          <h1 className="text-4xl font-bold text-white">Mi Empresa</h1>
          <p className="mt-4 text-xl text-white opacity-90">
            Bienvenido a nuestro catálogo de productos
          </p>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-4">
        <ProductsSwiper products={products} />
        <WhatsAppLink link="https://wa.me/123456789" />
      </main>

      <footer className="bg-gray-200 py-4">
        <div className="container mx-auto text-center px-4">
          <p className="text-sm text-gray-700">
            © {new Date().getFullYear()} Mi Empresa. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
