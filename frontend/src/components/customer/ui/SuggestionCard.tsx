import Loading from "../../ui/Loading";
import Image from "../../ui/Image";
import { memo } from "react";
import { Link } from "react-router-dom";
import { mockCardList } from "../../../mocks/mockCardLists";

type Props = {
  search: string;
};
function Suggestioncard({ search }: Props) {
  const cards = mockCardList;
  const isLoading = false;

  /*
  useEffect(() => {
    if (search) {
      setKeyword(search.trim());
    }
  }, [search, setKeyword]);
  */

  return (
    <>
      <div className="p-2.5">
        <p className="font-medium text-balance">
          Kết quả tìm kiếm cho <span className="text-[#FF424E]">{search}</span>
        </p>
      </div>

      <div className="overflow-y-auto max-h-96 flex flex-col">
        {isLoading ? (
          <Loading height={25} size={35} color={"#FF424E"} thickness={3} />
        ) : cards.length > 0 ? (
          cards.map((card) => (
            <div className="flex w-full" key={card.cardId}>
              <Link to={`/card/${card.cardId}`} className="w-full">
                <div className="hover:bg-[#F7F7F7] p-2.5 w-full flex gap-3.5 border-t border-gray-200">
                  <div className="w-[80px] h-[80px] overflow-hidden">
                    <Image
                      source={`${card.frontImage}`}
                      alt={card.name}
                      className="w-full h-full object-contain z-1 relative"
                      loading="lazy"
                    />
                  </div>

                  <p className="font-medium">{card.name}</p>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p className="p-4 text-center text-[0.9rem] text-gray-500">
            Không tìm thấy kết quả
          </p>
        )}
      </div>
    </>
  );
}

export default memo(Suggestioncard);
