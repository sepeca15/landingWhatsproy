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
  abierto,
}: HeaderProps) {
  return (
    <header className="fixed bg-gradient-to-r py-6 flex-1 w-full z-[1000] ">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-[20px] md:flex-row flex-col justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 relative">
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
            </div>
          </div>

          {typeof abierto === 'boolean' && (
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${abierto ? 'bg-green-400' : 'bg-red-700'}`}></div>
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