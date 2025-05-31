import { useState, useEffect } from 'react';
import Image from 'next/image';
import imageBase from '../../public/image-placeholder-base.webp';
import { useCart } from '../context/CartContext';

interface CartProps {
  onCheckout: () => void;
}

export default function Cart({ onCheckout }: CartProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { items, updateQuantity, removeItem } = useCart();
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newTotal = items.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
    setTotal(newTotal);
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg w-80 z-50">
        <p className="text-center text-gray-500 mb-4">¡Haz tu pedido acá!</p>
        <button
          onClick={onCheckout}
          className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition-colors"
        >
          Contactar
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div
        className={`bg-white rounded-lg shadow-lg transition-all duration-300 ${isExpanded ? 'w-80' : 'w-16 h-16'
          }`}
      >
        {!isExpanded ? (
          <button
            onClick={() => setIsExpanded(true)}
            className="w-full h-full flex items-center justify-center bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
          >
            <div className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {items.reduce((sum, item) => sum + item.cantidad, 0)}
              </span>
            </div>
          </button>
        ) : (
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Carrito de Compras</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto">
              {items.map((item) => (
                <div key={item.id} className="flex items-center gap-2 mb-4 pb-4 border-b">
                  <div className="relative w-16 h-16 shadow-xl">
                    <Image
                      src={item.imagen || imageBase.src}
                      alt={item.nombre}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium">{item.nombre}</h4>
                    <p className="text-sm text-gray-600">${item.precio}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <button
                        onClick={() => updateQuantity(item.id, Math.max(0, item.cantidad - 1))}
                        className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.cantidad}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                        className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-semibold">${total}</span>
              </div>
              <button
                onClick={onCheckout}
                className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600 transition-colors"
              >
                Contactar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 