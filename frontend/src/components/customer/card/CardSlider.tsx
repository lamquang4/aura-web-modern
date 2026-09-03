import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { FreeMode } from "swiper/modules";
import { memo } from "react";
import type { CardListItemResponse } from "../../../types/type";
import CardSliderSkeleton from "../skeleton/CardSliderSkeleton";
import CardItem from "./CardItem";
import { Link } from "react-router-dom";

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

        <div className="space-y-[30px]">
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

          <div className="flex justify-center items-center">
            <Link
              to={"/cards"}
              className="bg-black text-white border-0 cursor-pointer text-[0.9rem] font-medium w-auto !flex p-[10px_12px] items-center justify-center gap-[5px]"
            >
              Xem tất cả
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(CardSlider);
