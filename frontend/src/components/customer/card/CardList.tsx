import { useLocation } from "react-router-dom";
import type { CardListItemResponse } from "../../../types/type";
import CardItem from "./CardItem";
import CardListSkeleton from "../skeleton/CardListSkeleton";

interface Props {
  title?: string;
  cards: CardListItemResponse[];
  isLoading: boolean;
  total: number;
}

function CardList({ title, cards, isLoading = false, total }: Props) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("q");

  return (
    <section className="mb-[40px] px-[15px] text-black">
      <div className="mx-auto max-w-[1200px] w-full">
        <h2 className="mb-[20px]">
          {isLoading && "Đang tải..."}
          {!isLoading && search && `Kết quả cho "${search}"`}
          {!isLoading && !search && `${title ?? "Không tìm thấy"} (${total})`}
        </h2>
        
        {isLoading ? (
          <CardListSkeleton count={12} />
        ) : (
          cards.length > 0 && (
            <div
              className={`grid grid-cols-2 gap-x-[10px] gap-y-[35px] lg:grid-cols-3 2xl:grid-cols-4 ${
                cards.length <= 0 ? "h-[50vh]" : ""
              }`}
            >
              {cards.map((card) => {
                return <CardItem card={card} />;
              })}
            </div>
          )
        )}
      </div>
    </section>
  );
}

export default CardList;
