import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { memo } from "react";
import type { CardListItemResponse } from "../../../types/type";
import CardSliderSkeleton from "../skeleton/CardSliderSkeleton";
import CardItem from "./CardItem";

interface Props {
  title: string;
  isLoading?: boolean;
  cards: CardListItemResponse[];
}

function CardSlider({ title, isLoading = false, cards }: Props) {
  return (
    <section className="mb-[40px] px-[15px] text-black">
      <div className="mx-auto max-w-[1200px] w-full">
        <h2 className="mb-[20px]">{title}</h2>

        {isLoading ? (
          <CardSliderSkeleton count={4} />
        ) : (
          cards.length > 0 && (
            <Swiper
              spaceBetween={10}
              modules={[FreeMode]}
              freeMode={true}
              grabCursor={true}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
                1640: {
                  slidesPerView: 4,
                },
              }}
            >
              {cards.map((card) => {
                return (
                  <SwiperSlide key={card.cardId}>
                    <CardItem card={card} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )
        )}
      </div>
    </section>
  );
}

export default memo(CardSlider);
