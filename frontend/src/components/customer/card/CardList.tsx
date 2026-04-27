import { useLocation } from "react-router-dom";
import type { CardListItemResponse } from "../../../types/type";
import CardItem from "./CardItem";
import CardListSkeleton from "../skeleton/CardListSkeleton";
import Image from "../../ui/Image";
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
    <>
      <h2 className="mb-[20px]">
        {isLoading && "Đang tải..."}
        {!isLoading && search && `Kết quả cho "${search}"`}
        {!isLoading && !search && `${title ?? "Không tìm thấy"} (${total})`}
      </h2>

      {isLoading ? (
        <CardListSkeleton count={12} />
      ) : cards.length > 0 ? (
        <div
          className={`grid grid-cols-2 gap-x-[10px] gap-y-[35px] lg:grid-cols-3 2xl:grid-cols-4 ${
            cards.length <= 0 ? "h-[50vh]" : ""
          }`}
        >
          {cards.map((card) => {
            return <CardItem card={card} />;
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="flex flex-col justify-center items-center gap-[15px]">
            <Image
              source={"/assets/notfound1.webp"}
              className={"w-[135px]"}
              alt={"not found"}
              loading="eager"
            />

            <h4>Không tìm thấy thiệp nào</h4>
          </div>
        </div>
      )}
    </>
  );
}

export default CardList;
