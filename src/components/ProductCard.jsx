export default function ProductCard({ product }) {


  return (
    <div className="w-full max-w-80 h-96 m-4">
      <div
        className="relative w-full h-full"
      >
        <div
          className="absolute w-full h-full bg-white border rounded-lg shadow-lg"
        >
          {!product.disponible && (
            <div className="absolute top-0 left-0 bg-red-500 text-white px-2 py-1 text-xs">
              No disponible
            </div>
          )}
            <img
              src={product.imageUrl}
              alt={product.nombre}
              className="w-full h-48 object-cover rounded-t-lg"
            />
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold">{product.nombre}</h3>
                <span className="text-lg font-bold">
                  ${product.precio.toFixed(2)} {product.currency}
                </span>
              </div>
              <p className="text-gray-600 text-sm line-clamp-3">
                {product.descripcion}
              </p>
            </div>
          </div>
      </div>
    </div>
  );
}

  