"use client";

import { useEffect, useState } from 'react';
import ProductsSwiper from '../components/ProductsSwiper';
import Header from '../components/Header';
import Cart from '../components/Cart';
import Testimonios from '../components/Testimonios';
import { useCart } from '../context/CartContext';
import { EmpresaResponse, Producto, Reseña } from '../types';

export default function Home() {
  const [empresaInfo, setEmpresaInfo] = useState<EmpresaResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { addToCart, items } = useCart();

  // Datos de ejemplo para testimonios
  const testimoniosEjemplo: Reseña[] = [
    {
      id: 1,
      nombre: "María González",
      comentario: "¡Excelente servicio! Los productos son de primera calidad y la atención es increíble.",
      calificacion: 5,
      fecha: "2024-03-15",
      imagen: "https://i.pravatar.cc/150?img=1"
    },
    {
      id: 2,
      nombre: "Juan Pérez",
      comentario: "Muy satisfecho con la calidad y el tiempo de entrega. Definitivamente volveré a comprar.",
      calificacion: 4,
      fecha: "2024-03-10",
      imagen: "https://i.pravatar.cc/150?img=2"
    },
    {
      id: 3,
      nombre: "Ana Martínez",
      comentario: "La mejor experiencia de compra que he tenido. Todo llegó perfecto y a tiempo.",
      calificacion: 5,
      fecha: "2024-03-05",
      imagen: "https://i.pravatar.cc/150?img=3"
    }
  ];

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

  const handleAddToCart = (product: Producto) => {
    addToCart(product, 1);
  };

  const handleCheckout = () => {
    if (!empresaInfo?.data.greenApiInstance || !empresaInfo?.data.greenApiInstanceToken) {
      alert('No se puede procesar el pedido en este momento. Por favor, intente más tarde.');
      return;
    }

    let fullMessage;
    if (items.length === 0) {
      fullMessage = `¡Hola! Me gustaría hacer un pedido. ¿Podrías ayudarme con el menú?`;
    } else {
      const message = items.map(item => 
        `${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}`
      ).join('\n');
      const total = items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
      fullMessage = `¡Hola! Me gustaría hacer el siguiente pedido:\n\n${message}\n\nTotal: $${total}`;
    }

    const whatsappUrl = `https://wa.me/${empresaInfo.data.greenApiInstance}?text=${encodeURIComponent(fullMessage)}`;
    window.open(whatsappUrl, '_blank');
  };
  
  const productoEjemplo = {
    id: 0,
    nombre: "Producto Ejemplo",
    precio: 150,
    imagen: "https://via.placeholder.com/600x400",
    empresa_id: 0,
    descripcion: "Esta es una breve descripción del producto. Se muestra en tres líneas y se recorta si es muy larga.",
    plazoDuracionEstimadoMinutos: 30,
    disponible: true 
  };

  const products = empresaInfo ? empresaInfo.products : Array(6).fill(productoEjemplo);

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        empresaNombre={empresaInfo?.data.nombre} 
        logo={empresaInfo?.data.logo}
        abierto={empresaInfo?.data.abierto}
      />

      <div className="flex-grow container mx-auto px-4 py-4">
        {loading && <p>Cargando información de la empresa...</p>}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && (
          <>
            <ProductsSwiper products={products} onAddToCart={handleAddToCart} />
            <Testimonios reseñas={testimoniosEjemplo} />
            <Cart onCheckout={handleCheckout} />
          </>
        )}
      </div>

      <footer className="bg-gray-200 py-4">
        <div className="container mx-auto text-center px-4">
          <p className="text-sm text-gray-700">
            © {new Date().getFullYear()} {empresaInfo ? empresaInfo.data.nombre : 'Measy'}. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}