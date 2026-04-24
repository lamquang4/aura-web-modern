import { useState } from "react";
import { motion } from "framer-motion";
import ContentEditable from "react-contenteditable";
import Image from "../../ui/Image";
import type { TextStyle } from "../../../types/type";
import ToolTip from "../ui/ToolTip";
import { RefreshCw } from "lucide-react";

interface Props {
  frontImage: string;
  backImage?: string;
  content: string;
  textStyle: TextStyle;
  onContentChange: (val: string) => void;
}

function CardPreview({
  frontImage,
  backImage,
  content,
  textStyle,
  onContentChange,
}: Props) {
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const handleFlip = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsFlipped((f) => !f);
  };

  const handleContentChange = (e: any) => {
    const text = e.target.value
      .replace(/<\/div>/g, "\n")
      .replace(/<br>/g, "\n")
      .replace(/<\/?[^>]+(>|$)/g, "");
    onContentChange(text);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative inline-flex">
        <div className="absolute top-0 right-0 z-10">
          <div className="relative group">
            <motion.button
              whileHover={{ scale: 1.1, rotate: -10 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleFlip}
              disabled={isAnimating}
              type="button"
              className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center"
            >
              <RefreshCw size={20} />
            </motion.button>

            <ToolTip text="Lật thiệp" />
          </div>
        </div>

        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
          onAnimationComplete={() => setIsAnimating(false)}
          className="relative w-full max-w-[400px]"
        >
          <div
            style={{ backfaceVisibility: "hidden" }}
            className={`${isFlipped ? "hidden" : "block"} shadow-xl rounded-sm overflow-hidden`}
          >
            {frontImage && (
              <Image
                source={frontImage}
                alt="Mặt trước thiệp"
                className="w-full object-cover"
                loading="eager"
              />
            )}
          </div>

          <div
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
            className={`${isFlipped ? "block" : "hidden"} relative shadow-xl rounded-sm overflow-hidden bg-white`}
          >
            <Image
              source={backImage || "/assets/white.png"}
              alt="Mặt sau thiệp"
              className="w-full max-w-[400px] object-cover"
              loading="eager"
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%]">
              <ContentEditable
                html={content}
                onChange={handleContentChange}
                style={{
                  fontFamily: textStyle.fontFamily,
                  fontWeight: textStyle.fontWeight,
                  fontStyle: textStyle.fontStyle,
                  color: textStyle.fontColor,
                  border: `2px dashed ${textStyle.fontColor || "#8AB6E6"}`,
                }}
                className="text-[1.2rem] leading-6 whitespace-pre-line p-2 outline-0 text-center"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default CardPreview;
