import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination, EffectFade, Autoplay } from 'swiper'
SwiperCore.use([Navigation])
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from 'next/image';
import style from "./swiper.module.css"


SwiperCore.use([Pagination, Autoplay, EffectFade]);

export const SlideCursor = () => {
  const images = ["/happyChristmas.jpg", "/ChristmasBanner.png", "/happybirthdayBanner.jpg"];

  return (
    <>
      <div
        className=" hidden mx-auto sm:container sm:block"
      >
        <Swiper
          slidesPerView={4}
          centeredSlides={true}
          spaceBetween={30}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            bulletClass: `swiper-pagination-bullet ${style.custom_bullet}`,
            bulletActiveClass: `swiper-pagination-bullet-active ${style.custom_bullet_active}`,
          }}
          autoplay={{ delay: 5000, disableOnInteraction: true, pauseOnMouseEnter: true, }}
          speed={1000}
          loop={true}

        // // スライドが切り替わるたび実行される。
        // onSlideChange={(swiper) => console.log('スライドが変更されました。')}
        // // スライドが表示された最初の1回に実行されます。
        // onSwiper={(swiper) => console.log('スライドが生成されました')}
        >


          {images.map((src: string, index: number) => {
            return (
              <SwiperSlide key={`${index}`}>
                <Image
              
                  src={src}
                  // layout="responsive"
                  width={300}
                  height={200}
                  alt="top"
                // priority={true}
                />
              </SwiperSlide>
            );
          })}

        </Swiper>

      </ div>
      <div
        className=" w-96 mx-auto sm:hidden"
      >
        <Swiper
          slidesPerView={2}
          centeredSlides={true}
          spaceBetween={30}
          modules={[Pagination]}
          pagination={{
            clickable: true,
            bulletClass: `swiper-pagination-bullet ${style.custom_bullet}`,
            bulletActiveClass: `swiper-pagination-bullet-active ${style.custom_bullet_active}`,
          }}
          autoplay={{ delay: 5000, disableOnInteraction: true, pauseOnMouseEnter: true, }}
          speed={1000}
          loop={true}

        // // スライドが切り替わるたび実行される。
        // onSlideChange={(swiper) => console.log('スライドが変更されました。')}
        // // スライドが表示された最初の1回に実行されます。
        // onSwiper={(swiper) => console.log('スライドが生成されました')}
        >


          {images.map((src: string, index: number) => {
            return (
              <SwiperSlide key={`${index}`}>
                <Image
                  src={src}
                  // layout="responsive"
                  width={300}
                  height={200}
                  alt="top"
                // priority={true}
                />
              </SwiperSlide>
            );
          })}

        </Swiper>

      </ div>
    </>
  )
}
