"use client"

import { useState } from "react"
import imageBase from "../../public/image-placeholder-base.webp"
import Image from "next/image";
import { useRouter } from "next/navigation"

export default function ProductCard({ product }) {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)
  const handleProductClick = (product) => {
    localStorage.setItem("selectedProduct", JSON.stringify(product))
    router.push(`/producto/${product.id}`)
  }

  return (
    <div className="w-full max-w-80 h-auto m-4">
      <div
        className="relative w-full h-full transition-all duration-300 transform hover:scale-[1.02] cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => handleProductClick(product)}
      >
        <div
          className={`relative w-full h-full bg-white border rounded-lg shadow-md overflow-hidden ${
            isHovered ? "shadow-xl" : ""
          }`}
        >
          {!product.disponible && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-3 py-1 text-xs font-medium rounded-full z-10">
              No disponible
            </div>
          )}
          <div className="relative h-52 overflow-hidden">
            <Image
              src={product.imagen ? product.imagen : imageBase.src}
              alt={product.nombre}
              fill
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out"
            />
          </div>
          <div className="p-5">
            <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">{product.nombre}</h3>
            <p className="text-gray-600 text-sm line-clamp-3 mb-4 min-h-[4.5rem]">{product.descripcion}</p>
            <div className="mt-auto pt-2 border-t border-gray-100">
              <span className="block text-xl font-bold text-gray-800">
                ${product.precio}
                <span className="text-sm font-medium text-gray-500 ml-1">{product.currency}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
