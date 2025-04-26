"use client";

import { useEffect, useState } from 'react';
import ProductsSwiper from '../components/ProductsSwiper';
import WhatsAppLink from '../components/WhatsAppLink';
import Header from '../components/Header';

interface EmpresaData {
  createdAt: string;
  updatedAt: string;
  id: number;
  nombre: string;
  db_name: string;
  logo: string | null;
  descripcion: string | null;
  menu: string | null;
  abierto: boolean;
  hora_cierre: string;
  hora_apertura: string;
  notificarReservaHoras: boolean;
  greenApiInstance: string;
  greenApiInstanceToken: string;
  remaindersHorsRemainder: number;
  apiConfigured: boolean;
  deploy: boolean;
  greenApiConfigured: boolean;
  direccion: string;
  intervaloTiempoCalendario: number;
  timeZone: string;
}

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  imagen: string | null;
  empresa_id: number;
  descripcion: string;
  plazoDuracionEstimadoMinutos: number;
  disponible: boolean;
}

interface EmpresaResponse {
  ok: boolean;
  data: EmpresaData;
  products: Producto[];
}

export default function Home() {
  const [empresaInfo, setEmpresaInfo] = useState<EmpresaResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    
    fetch('/api/empresa')
      .then((res) => {
        if(!res.ok) {
          throw new Error('Error al obtener información');
        }
        return res.json();
      })
      .then((data: EmpresaResponse) => {
        setEmpresaInfo(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Error desconocido');
        setLoading(false);
      });
  }, []);
  
  const productoEjemplo = {
    imageUrl: "https://via.placeholder.com/600x400",
    nombre: "Producto Ejemplo",
    precio: 150,
    currency: "USD",
    descripcion: "Esta es una breve descripción del producto. Se muestra en tres líneas y se recorta si es muy larga.",
    disponible: true 
  };

  const products = empresaInfo ? empresaInfo.products : Array(6).fill(productoEjemplo);

  return (
    <div className="min-h-screen flex flex-col">
      <Header empresaNombre={empresaInfo?.data.nombre} />

      <div className="flex-grow container mx-auto px-4 py-4">
        {loading && <p>Cargando información de la empresa...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && (
          <>
            <ProductsSwiper products={products as Producto[]} />
            <WhatsAppLink link="https://wa.me/123456789" />
          </>
        )}
      </div>

      <footer className="bg-gray-200 py-4">
        <div className="container mx-auto text-center px-4">
          <p className="text-sm text-gray-700">
            © {new Date().getFullYear()} {empresaInfo ? empresaInfo.data.nombre : 'Mi Empresa'}. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}