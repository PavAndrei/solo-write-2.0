import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { FC } from 'react';

interface ImagesSliderProps {
  slides: string[];
}

export const ImagesSlider: FC<ImagesSliderProps> = ({ slides }) => {
  console.log(slides);

  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={2}
      // centeredSlides={true}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      className="w-full items-center justify-center"
    >
      {slides?.map((slide) => (
        <SwiperSlide>
          <img className="w-100 h-100 object-cover rounded-md" src={slide} alt="" />
        </SwiperSlide>
      ))}
      ...
    </Swiper>
  );
};
