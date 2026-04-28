import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
type Props = {
  count: number;
};

function CardSliderSkeleton({ count }: Props) {
  return (
    <Swiper
      spaceBetween={12}
      modules={[FreeMode]}
      freeMode={true}
      breakpoints={{
        0: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
        1640: { slidesPerView: 4 },
      }}
    >
      {Array.from({ length: count }).map((_, index) => (
        <SwiperSlide key={index}>
          <div className="animate-pulse space-y-[15px]">
            <div className="w-full pt-[120%] bg-gray-200 relative" />

            <div className="space-y-[6px]">
              <div className="h-[14px] bg-gray-200 rounded w-3/4 mx-auto" />
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default memo(CardSliderSkeleton);
