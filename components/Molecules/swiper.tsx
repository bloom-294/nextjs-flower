import React, { useRef } from 'react';
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import style from "./swiper.module.css";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";


SwiperCore.use([
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
]);

const images = [
  "/banner/ChristmasBanner.svg",
  "/banner/CoupleBanner.svg",
  "/banner/Subscription.svg",
  // "/banner/happybirthdayBanner.svg",
  // "/banner/happyChristmas.svg",
];

export const Slide = () => {
  const swiperRef = useRef<SwiperCore>({} as SwiperCore);

  return (
    <div className="mx-auto w-[100vw] sm:container sm:w-auto overflow-hidden sm:h-[500px bg-red-200 relative">
      <Swiper
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        slidesPerView={"auto"}
        spaceBetween={10}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        speed={1000}
        loop
        modules={[Pagination, Autoplay]}
        pagination={{
          clickable: true,
          bulletClass: `swiper-pagination-bullet ${style.custom_bullet}`,
          bulletActiveClass: `swiper-pagination-bullet-active ${style.custom_bullet_active}`,
        }}
        className="sm:h-[500px]"
      >
        {images.map((src) => (
          <SwiperSlide key={src} className="!w-[85%] sm:!w-[700px] sm:!h-[500px] bg-orange-200 flex items-center justify-center overflow-hidden">
            <div className="w-full">
              <Image
                src={src}
                alt="top"
                layout="responsive"
                width={700}
                height={500}
                priority
                className="object-cover w-full h-full"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button 
        onClick={() => swiperRef.current.slidePrev()}
        className="absolute left-10 g:left-32 top-[50%] z-10 bg-white/80 aspect-square w-20 h-auto rounded-full hover:bg-white transition border border-[#5d3d4a] hidden md:block"
      >
        ◀
      </button>
      <button 
        onClick={() => swiperRef.current.slideNext()}
        className="absolute right-10 lg:right-32 top-[50%] z-10 bg-white/80 aspect-square w-20 h-auto rounded-full hover:bg-white transition border border-[#5d3d4a] hidden md:block"
      >
        ▶
      </button>
    </div>
  );
};
