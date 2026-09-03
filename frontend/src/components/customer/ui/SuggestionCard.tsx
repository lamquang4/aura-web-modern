import Loading from "../../ui/Loading";
import Image from "../../ui/Image";
import { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useGetActiveCards } from "../../../hooks/queries/useCards";
import useDebounce from "../../../hooks/useDebounce";

interface Props {
  search: string;
  className: string;
}

function SuggestionCard({ search, className }: Props) {
  const [keyword, setKeyword] = useState("");

  const debouncedKeyword = useDebounce(keyword, 500);

  const { data, isLoading } = useGetActiveCards({
    page: 1,
    limit: 12,
    q: debouncedKeyword,
  });
  const cards = data?.data ?? [];

  useEffect(() => {
    setKeyword(search.trim());
  }, [search]);

  return (
    <div className={className}>
      <div className="p-2.5">
        <p className="font-medium text-balance">
          Kết quả tìm kiếm cho <span className="text-danger">{search}</span>
        </p>
      </div>

      <div className="overflow-y-auto max-h-90">
        {isLoading ? (
          <Loading height={25} size={35} color={"#d9534f"} thickness={3} />
        ) : cards.length > 0 ? (
          cards.map((card) => (
            <div className="flex w-full" key={card.cardId}>
              <Link to={`/design/card/${card.cardId}`} className="w-full">
                <div className="hover:bg-bg p-2.5 w-full flex gap-3.5 border-b border-border">
                  <div className="w-[80px] h-[80px] overflow-hidden">
                    <Image
                      src={`${card.frontImage}`}
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
          <p className="p-4 text-center text-[0.9rem] text-text-muted">
            Không tìm thấy kết quả
          </p>
        )}
      </div>
    </div>
  );
}

export default memo(SuggestionCard);
