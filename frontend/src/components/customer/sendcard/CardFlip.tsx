import { motion } from "framer-motion";
import type { SavedCardDetailResponse } from "../../../types/type";
import Image from "../../ui/Image";

interface Props {
  card: SavedCardDetailResponse;
  isFlipped: boolean;
}

function CardFlip({ card, isFlipped }: Props) {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div style={{ perspective: "1000px" }} className="w-full max-w-[400px]">
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative w-full"
        >
          <div
            style={{ backfaceVisibility: "hidden" }}
            className="shadow-xl rounded-sm overflow-hidden"
          >
            <Image
              source={card.card.frontImage}
              alt="Mặt trước thiệp"
              className="w-full h-full block"
              loading="eager"
            />
          </div>

          <div
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
            className="absolute inset-0 shadow-xl rounded-sm overflow-hidden"
          >
            <Image
              source={card.card.backImage || "/assets/white.png"}
              alt="Mặt sau thiệp"
              className="w-full h-full block"
              loading="eager"
            />
            <div
              className="absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] text-center text-[1.2rem] leading-6 whitespace-pre-line"
              style={{
                color: card.fontColor || "black",
                fontFamily: card.fontFamily || "Arial",
                fontStyle: card.fontStyle,
                fontWeight: card.fontWeight,
              }}
            >
              {card.customContent}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default CardFlip;
