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
          { prevEl: '.swiper-button-prev-custom', nextEl: '.swiper-button-next-custom' })
        }
        pagination={{
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
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1280: {
            slidesPerView: slides.length,
            spaceBetween: 50,
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
          'swiper-button-prev-custom absolute bottom-[-15%] left-[40%] md:top-1/2 md:left-2 z-100 text-3xl dark:text-gray-200 text-gray-950 active:scale-110 active:text-gray-900 transition-all ease-in-out duration-500 xl:hidden',
          slides.length <= 2 && 'md:hidden',
          slides.length >= 3 && 'lg:hidden'
        )}
      />
      <FaArrowCircleRight
        className={clsx(
          'swiper-button-next-custom absolute bottom-[-15%] right-[40%] md:top-1/2 md:right-2 z-100 text-3xl dark:text-gray-200 text-gray-950 active:scale-110 active:text-gray-500 transition-all ease-in-out duration-300 xl:hidden',
          slides.length <= 2 && 'md:hidden',
          slides.length >= 3 && 'lg:hidden'
        )}
      />

      <div
        className={clsx(
          'swiper-pagination-custom !absolute !bottom-[-20px] !left-1/2 !w-auto !flex xl:hidden',
          slides.length >= 3 && 'lg:hidden'
        )}
      />
    </div>
  );
};
