import { Link } from "react-router-dom";
import Image from "../../ui/Image";
import type { CardListItemResponse } from "../../../types/type";

interface Props {
  card: CardListItemResponse;
}
function CardItem({ card }: Props) {
  return (
    <div className="space-y-[15px]">
      <div className="relative group">
        <Link to={`/card/${card.cardId}`}>
          <div
            className={`w-full overflow-hidden pt-[120%] relative ${
              card.backImage ? "group" : ""
            }`}
          >
            <Image
              source={card.frontImage}
              alt={card.name}
              className={`absolute object-contain inset-0 w-full h-full transition-opacity duration-300 ${
                card.backImage ? "group-hover:opacity-0" : ""
              }`}
              loading="lazy"
            />

            {card.backImage && (
              <Image
                source={card.backImage}
                alt={card.name}
                className="absolute inset-0 object-contain w-full h-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                loading="lazy"
              />
            )}
          </div>
        </Link>
      </div>

      <div className="space-y-[6px]">
        <h5 className="font-medium capitalize line-clamp-2 text-center">
          {card.name}
        </h5>
      </div>
    </div>
  );
}

export default CardItem;
