import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";

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

export const Slide = () => {
  const images = [
    "/topImageDryFlower.png",
    "/topImageGreenPlants.png",
    "/topImageTulip.png",
  ];

  return (
    <div className="mx-auto w-[100vw] sm:container sm:w-auto">
      <Swiper
        slidesPerView={1}
        centeredSlides
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        speed={1000}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop
      >
        {images.map((src) => (
          <SwiperSlide key={src}>
            <Image
              src={src}
              alt="top"
              layout="responsive"
              width={1280}
              height={550}
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
