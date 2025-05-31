"use client";
import 'swiper/css';
import 'swiper/css/navigation';
import CategoryCard from './CategoryCard';
import BorderMenu from '../../public/BorderMenu'
import MenuTitle from '../../public/MenuTitle'

export default function ProductsSwiper({ categorys, onAddToCart }) {
  return (
    <div className='relative mt-[125px] md:w-auto w-full md:gap-x-[125px] grid md:grid-cols-2 grid-cols-1 md:px-[150px] py-[50px]  place-items-center'>
      <div className="absolute top-[-400px] left-1/2 transform -translate-x-1/2">
        <MenuTitle />
      </div>

      <div className='absolute top-0 left-0'>
        <BorderMenu />
      </div>
      <div className='absolute top-0 right-0 scale-x-[-1]'>
        <BorderMenu />
      </div>
      <div className='absolute bottom-0 right-0 rotate-180'>
        <BorderMenu />
      </div>
      <div className='absolute bottom-0 right-0 rotate-180'>
        <BorderMenu />
      </div>
      <div className='absolute bottom-0 left-0 rotate-180 scale-x-[-1]'>
        <BorderMenu />
      </div>
      {categorys.map((category, index) => (
        <div key={index} className={index % 2 !== 0 ? 'mt-[80px]' : 'mt-0'}>
          <CategoryCard category={category} onAddToCart={onAddToCart} />
        </div>
      ))}
    </div>
  )

}
