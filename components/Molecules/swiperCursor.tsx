import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Pagination } from "swiper";
import style from "./swiper.module.css";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

SwiperCore.use([Pagination, Autoplay]);

const images = [
  "/happyChristmas.jpg",
  "/ChristmasBanner.png",
  "/happybirthdayBanner.jpg",
];

export const SlideCursor = () => {
  const swiperProps = {
    centeredSlides: true,
    spaceBetween: 30,
    modules: [Pagination],
    pagination: {
      clickable: true,
      bulletClass: `swiper-pagination-bullet ${style.custom_bullet}`,
      bulletActiveClass: `swiper-pagination-bullet-active ${style.custom_bullet_active}`,
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: true,
      pauseOnMouseEnter: true,
    },
    speed: 1000,
    loop: true,
  };

  const renderSlides = (sizes: string) =>
    images.map((src) => (
      <SwiperSlide key={src}>
        <Image
          src={src}
          width={300}
          height={200}
          alt="top"
          sizes={sizes}
        />
      </SwiperSlide>
    ));

  return (
    <>
      <div className="mx-auto hidden sm:container sm:block">
        <Swiper slidesPerView={4} {...swiperProps}>
          {renderSlides("25vw")}
        </Swiper>
      </div>

      <div className="mx-auto w-[100vw] sm:hidden sm:w-auto">
        <Swiper slidesPerView={2} {...swiperProps}>
          {renderSlides("50vw")}
        </Swiper>
      </div>
    </>
  );
};
