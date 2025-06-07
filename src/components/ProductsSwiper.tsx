"use client";
import 'swiper/css';
import 'swiper/css/navigation';
import CategoryCard from './CategoryCard';
import BorderMenu from '../../public/BorderMenu';
import MenuTitle from '../../public/MenuTitle';
import * as React from 'react';
import UncustomModal from './Modal';

interface IProductsSwiper {
  categorys: any;
  onAddToCart: any;
}

export default function ProductsSwiper({ categorys, onAddToCart }: IProductsSwiper) {
  const [stateModalInfo, setStateModalInfo] = React.useState<boolean>(false);
  const [productSelected, setproductSelected] = React.useState<any>({});

  const toggleModal = () => {
    setStateModalInfo((prev) => !prev);
  };

  const selectedItem = (item: any) => {
    setproductSelected(item);
    toggleModal();
  };

  return (
    <div id='myMenuDelivery' className="relative bg-cover bg-center rounded-[25px] bg-opacity-100 mt-[125px] shadow-yellow-300/20 bg-black/20 shadow-2xl md:w-auto w-full py-[50px]">

      <div className='absolute top-[50px] left-[10px] '>
        <BorderMenu />
      </div>
      <div className='absolute top-[50px] right-[10px] scale-x-[-1]'>
        <BorderMenu />
      </div>
      <div className='absolute bottom-[50px] right-[10px] rotate-180'>
        <BorderMenu />
      </div>
      <div className='absolute bottom-[50px] left-[10px] rotate-180 scale-x-[-1]'>
        <BorderMenu />
      </div>

      <div className='flex mt-[0px] flex-1 flex-col items-center justify-center w-full mb-10'>
        <p className='text-white text-[50px]'>NUESTRO</p>
        <p className='text-yellow-500 text-[100px] ml-2'>MENU</p>
      </div>

      <div className="grid md:grid-cols-2 grid-cols-1 place-items-center md:gap-x-[125px] md:px-[120px]">
        {categorys.map((category: any, index: number) => (
          <div key={index} className={index % 2 !== 0 ? 'mt-[200px]' : 'mt-0'}>
            <CategoryCard
              selectedItem={selectedItem}
              category={category}
              onAddToCart={onAddToCart}
            />
          </div>
        ))}
      </div>
      <UncustomModal
        width='50rem'
        buttonSend="Cerrar"
        isOpen={stateModalInfo}
        onClose={toggleModal}
        title="Información del producto"
        handleComplete={toggleModal}
      >
        <div className="flex flex-col w-full flex-1 md:flex-row md:items-start itemss-center gap-8 text-gray-100">
          <div className="md:w-1/2 m-auto w-[20rem] shadow-xl shadow-yellow-500/20 rounded-2xl overflow-hidden">
            {productSelected?.imagen ? (
              <img
                src={productSelected.imagen}
                alt={productSelected.nombre}
                className="w-full h-[250px] object-cover transition duration-300 hover:scale-105"
              />
            ) : (
              <div className="w-full h-[250px] bg-gray-700 flex items-center justify-center text-gray-400 text-lg">
                Sin imagen disponible
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-between gap-5">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold text-yellow-400">{productSelected.nombre}</h2>

              <p className="text-base leading-relaxed text-gray-300">
                {productSelected.descripcion || (
                  <span className="italic text-gray-500">Sin descripción disponible.</span>
                )}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm">
                <div className="flex flex-col">
                  <span className="text-gray-400">Precio</span>
                  <span className="text-lg font-semibold text-green-400">
                    ${productSelected.precio}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-gray-400">Duración estimada</span>
                  <span className="text-lg font-medium">{productSelected.plazoDuracionEstimadoMinutos} min</span>
                </div>

                <div className="flex flex-col">
                  <span className="text-gray-400">Disponibilidad</span>
                  <span className={`text-lg font-medium ${productSelected.disponible ? 'text-green-500' : 'text-red-500'}`}>
                    {productSelected.disponible ? 'Disponible' : 'No disponible'}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-gray-400">ID Producto</span>
                  <span className="text-md text-gray-500">#{productSelected.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </UncustomModal>
    </div>
  );
}

