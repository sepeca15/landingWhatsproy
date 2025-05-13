"use client";
import React from 'react';
import { Resena } from '../types';

interface TestimoniosProps {
  reseñas: Resena[];
}

const Testimonios: React.FC<TestimoniosProps> = ({ reseñas }) => {
  const renderStars = (calificacion: number) => {
    return Array(5).fill(0).map((_, index) => (
      <span key={index} className={`text-2xl ${index < calificacion ? 'text-yellow-400' : 'text-gray-300'}`}>
        ★
      </span>
    ));
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Lo que dicen nuestros clientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reseñas.map((resena) => (
            <div key={resena.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                {resena.imagen ? (
                  <img
                    src={resena.imagen}
                    alt={resena.nombre}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4 flex items-center justify-center">
                    <span className="text-xl font-bold text-gray-500">
                      {resena.nombre.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <h3 className="font-semibold">{resena.nombre}</h3>
                  <div className="flex">
                    {renderStars(resena.calificacion)}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{resena.comentario}</p>
              <p className="text-sm text-gray-400">{new Date(resena.fecha).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonios; 