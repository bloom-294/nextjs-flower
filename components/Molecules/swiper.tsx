import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation, Pagination, EffectFade, Autoplay } from 'swiper'
SwiperCore.use([Navigation])
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import Image from 'next/image';
import style from "../../src/styles/swiper.module.css"


SwiperCore.use([Pagination, Autoplay, EffectFade]);

export const Slide = () => {
  const images = ["/topImageDryFlower.png", "/topImageGreenPlants.png", "/topImageTulip.png"];

  return (
    <>

      <div
        className=' sm:block sm:container mx-auto hidden'

      >
        <Swiper
          slidesPerView={1}
          centeredSlides={true}
          autoplay={{ delay: 3000, disableOnInteraction: true, pauseOnMouseEnter: true, }}
          // navigation={true}
          speed={1000}
          effect="fade"
          fadeEffect={{ crossFade: true }}
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
                  layout="responsive"
                  width={1280}
                  height={550}
                  alt="top"
                  priority={true}
                  className="z-1"
                />
              </SwiperSlide>
            );
          })}

        </Swiper>

      </ div>
      <div
        className=' sm:hidden  mx-auto w-96'

      >
        <Swiper
          slidesPerView={1}
          centeredSlides={true}
          autoplay={{ delay: 3000, disableOnInteraction: true, pauseOnMouseEnter: true, }}
          // navigation={true}
          speed={1000}
          effect="fade"
          fadeEffect={{ crossFade: true }}
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
                  layout="responsive"
                  width={1280}
                  height={700}
                  alt="top"
                  priority={true}
                  className="z-1"
                />
              </SwiperSlide>
            );
          })}

        </Swiper>

      </ div>

    </>
  )
}
