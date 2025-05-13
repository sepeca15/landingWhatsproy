"use client";

import Image from 'next/image';

interface HeaderProps {
  empresaNombre?: string;
  productoNombre?: string;
  logo?: string | null;
  abierto?: boolean;
}

export default function Header({ 
  empresaNombre = 'Measy', 
  productoNombre,
  logo,
  abierto 
}: HeaderProps) {
  return (
    <header className="relative bg-gradient-to-r from-[#25D366] to-[#128C7E] py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 relative">
              <Image 
                src={logo || '/logo.jpeg'} 
                alt={`Logo de ${empresaNombre}`}
                fill
                className="object-contain rounded-full"
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">
                {empresaNombre}
              </h1>
              {productoNombre ? (
                <p className="mt-2 text-xl text-white opacity-90">
                  {productoNombre}
                </p>
              ) : (
                <p className="mt-2 text-xl text-white opacity-90">
                  Bienvenido a nuestro catálogo de productos
                </p>
              )}
            </div>
          </div>
          
          {typeof abierto === 'boolean' && (
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${abierto ? 'bg-green-400' : 'bg-red-500'}`}></div>
              <span className="text-white font-medium">
                {abierto ? 'Abierto' : 'Cerrado'}
              </span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
} 