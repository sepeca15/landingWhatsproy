"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import ProductCard from './ProductCard';

export default function ProductsSwiper({ products, onAddToCart }) {
  return (
    <Swiper
      navigation
      modules={[Navigation]}
      spaceBetween={16}
      slidesPerView={1}
      breakpoints={{
        540: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
      }}
    >
      {products.map((product, index) => (
        <SwiperSlide key={index}>
          <ProductCard product={product} onAddToCart={onAddToCart} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
