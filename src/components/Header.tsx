"use client";

interface HeaderProps {
  empresaNombre?: string;
  productoNombre?: string;
}

export default function Header({ empresaNombre = 'Mi Empresa', productoNombre }: HeaderProps) {
  return (
    <header className="relative bg-gradient-to-r from-blue-500 to-teal-400 py-6">
      <div className="container mx-auto text-center px-4">
        <h1 className="text-4xl font-bold text-white">
          {empresaNombre}
        </h1>
        {productoNombre ? (
          <p className="mt-4 text-xl text-white opacity-90">
            {productoNombre}
          </p>
        ) : (
          <p className="mt-4 text-xl text-white opacity-90">
            Bienvenido a nuestro catálogo de productos
          </p>
        )}
      </div>
    </header>
  );
} 