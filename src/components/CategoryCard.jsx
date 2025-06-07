"use client"
import imageBase from "../../public/image-placeholder-base.webp"
import { FiInfo } from "react-icons/fi"
import { MdAddCircleOutline } from "react-icons/md"

export default function CategoryCard({ category, onAddToCart, selectedItem }) {

  const handleAddToCart = (e, element) => {
    e.stopPropagation();
    onAddToCart(element);
  }

  return (
    <div className="h-auto m-4 text-white-300">
      <div
        className="relative w-full h-full bg-transparent overflow-hidden cursor-pointer"
      >
        <div
          className="relative  w-full h-full rounded-lg"
        >
          <div className="relative overflow-hidden ">
            <img
              src={category.image ? category.image : imageBase.src}
              alt="imagen"
              className="w-full h-full object-cover transition-transform duration-300 ease-in-out hover:scale-[1.02] filter drop-shadow-[0_8px_20px_rgba(234,179,8,0.5)]"
            />
          </div>
          <div className="flex mt-8 flex-row w-full justify-center">
            <div className="mustard-blob m-auto">
              <h3 className=" text-[30px]  text-gray-100">{category.name}</h3>
            </div>
          </div>
          <div className="flex mt-8 flex-col items-center">
            {
              category?.producto?.length <= 0 ?
                <p className="text-white text-[25px]">Aun no hay productos...</p>
                :
                category?.producto?.map((element, index) => {
                  return (
                    <div className="w-full mt-4 text-[24px] flex text-white items-center gap-1" key={index}>
                      <p>{element.nombre}</p>
                      <div className="flex-grow border-b-[4px] mt-3 border-dotted border-white " />
                      <p>{element.precio}</p>
                      <button onClick={(e) => handleAddToCart(e, element)}><MdAddCircleOutline size={30} color="white" /></button>
                      <button onClick={() => selectedItem(element)}><FiInfo size={30} color="white" /></button>
                    </div>
                  );
                })
            }
          </div>
        </div>
      </div>
    </div>
  )
}
