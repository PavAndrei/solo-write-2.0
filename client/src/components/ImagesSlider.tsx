import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { FaArrowCircleLeft, FaArrowCircleRight } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/pagination';
import { FC } from 'react';
import clsx from 'clsx';

interface ImagesSliderProps {
  slides: string[];
}

export const ImagesSlider: FC<ImagesSliderProps> = ({ slides }) => {
  console.log(slides);

  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={24}
        slidesPerView={1}
        navigation={
          (slides.length > 1,
          {
            prevEl: '.swiper-button-prev-custom',
            nextEl: '.swiper-button-next-custom',
            enabled: slides.length > 1,
          })
        }
        pagination={{
          enabled: slides.length > 1,
          clickable: true,
          dynamicBullets: true,
          el: '.swiper-pagination-custom',
          bulletClass: 'swiper-pagination-bullet-custom',
          bulletActiveClass: 'swiper-pagination-bullet-active-custom',
        }}
        className="w-full md:w-[90%] lg:w-[80%] xl:w-[70%]"
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 32,
            enabled: slides.length > 2,
            pagination: {
              enabled: slides.length > 2,
              paginationDisabledClass: 'pag-disabled',
            },
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1280: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
          1536: {
            slidesPerView: 3,
            enabled: slides.length > 3,
            spaceBetween: 60,
            loop: true,
          },
        }}
      >
        {slides.map((slide, i) => (
          <SwiperSlide>
            <img className="w-full h-100 object-cover rounded-md" src={slide} alt={`slid-${i}`} />
          </SwiperSlide>
        ))}
      </Swiper>
      <FaArrowCircleLeft
        className={clsx(
          'swiper-button-prev-custom absolute bottom-[-15%] left-[40%] md:top-1/2 md:left-2 z-100 text-3xl dark:text-gray-200 text-gray-950 active:scale-110 active:text-gray-900 transition-all ease-in-out duration-500 cursor-pointer 2xl:left-20 2xl:text-6xl xl:left-10 xl:text-5xl',
          slides.length === 2 && 'sm:hidden',
          slides.length === 3 && '2xl:hidden'
        )}
      />
      <FaArrowCircleRight
        className={clsx(
          'swiper-button-next-custom absolute bottom-[-15%] right-[40%] md:top-1/2 md:right-2 z-100 text-3xl dark:text-gray-200 text-gray-950 active:scale-110 active:text-gray-500 transition-all ease-in-out duration-300 cursor-pointer 2xl:right-20 2xl:text-6xl xl:right-10 xl:text-5xl',
          slides.length <= 2 && 'sm:hidden',
          slides.length === 3 && '2xl:hidden'
        )}
      />

      <div
        className={clsx(
          'swiper-pagination-custom !absolute !bottom-[-20px] !left-1/2 !w-auto !flex',
          slides.length === 2 && 'sm:opacity-0',
          slides.length === 3 && 'sm:opacity-0'
        )}
      />
    </div>
  );
};
