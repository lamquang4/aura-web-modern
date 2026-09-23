import { motion, AnimatePresence } from "framer-motion";
import Button from "../../ui/Button";

interface Props {
  isOpened: boolean;
  onOpen: () => void;
}

function Envelope({ isOpened, onOpen }: Props) {
  return (
    <AnimatePresence>
      {!isOpened && (
        <motion.div
          key="envelope"
          initial={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1],
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[440px] bg-transparent"
        >
          {/* Inside */}
          <div className="absolute top-0 left-0 z-0" id="inside-envelope">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="350"
              height="440"
              viewBox="0 0 350 440"
            >
              <polygon
                points="0,146 350,146 350,440 0,440"
                style={{ fill: "#F5E6A3" }}
              />
            </svg>
          </div>

          {/* Body */}
          <div className="absolute top-0 left-0 z-10" id="body-envelope">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="350"
              height="440"
              viewBox="0 0 350 440"
            >
              <polygon
                points="0,146 175,293 350,146 350,440 0,440"
                style={{ fill: "#C1935F" }}
              />
            </svg>
          </div>

          {/* Header */}
          <motion.div
            id="header-envelope"
            className="absolute top-0 left-0 z-1"
            initial={false}
            animate={{
              rotateX: isOpened ? -55 : 0,
            }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            style={{
              transformOrigin: "50% 0%",
              perspective: 800,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="350"
              height="440"
              viewBox="0 0 350 440"
            >
              <polygon
                points="0,146 175,0 350,146"
                style={{ fill: "#F5E6A3" }}
              />

              {/* Cạnh trái */}
              <line
                x1="0"
                y1="146"
                x2="175"
                y2="0"
                style={{
                  stroke: "#C1935F",
                  strokeWidth: 17,
                }}
              />

              {/* Cạnh phải */}
              <line
                x1="175"
                y1="0"
                x2="350"
                y2="146"
                style={{
                  stroke: "#C1935F",
                  strokeWidth: 17,
                }}
              />

              {/* Cạnh đáy */}
              <line
                x1="350"
                y1="146"
                x2="0"
                y2="146"
                style={{
                  stroke: "#D3C172",
                  strokeWidth: 1,
                }}
              />
            </svg>
          </motion.div>

          <Button
            onClick={onOpen}
            onPointerDown={(e) => e.stopPropagation()}
            className="z-30 bg-yellow-400 w-[32px] h-[32px] rounded-full absolute top-[270px] left-[158px] hover:scale-110 shadow-md"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Envelope;
