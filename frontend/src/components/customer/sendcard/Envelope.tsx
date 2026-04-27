import { motion, AnimatePresence } from "framer-motion";

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
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-transparent"
        >
          <div className="absolute top-0 left-0">
            <svg xmlns="http://www.w3.org/2000/svg" height="300" width="300">
              <polygon
                points="0,100 300,100 300,300 0,300"
                style={{ fill: "#FA8B7E" }}
              />
            </svg>
          </div>

          <div className="absolute top-0 left-0 z-10">
            <svg xmlns="http://www.w3.org/2000/svg" height="300" width="300">
              <polygon
                points="0,100 150,200 300,100 300,300 0,300"
                style={{ fill: "#FFB094", stroke: "#FFB094", strokeWidth: 3 }}
              />
            </svg>
          </div>

          <div className="absolute top-0 left-0 z-[11]">
            <svg xmlns="http://www.w3.org/2000/svg" height="300" width="300">
              <motion.polygon
                points="0,100 150,200 300,100"
                animate={
                  isOpened
                    ? { points: "0,100 150,-20 300,100" }
                    : { points: "0,100 150,200 300,100" }
                }
                transition={{ duration: 0.5, ease: "easeOut" }}
                style={{ fill: "#FA8B7E", stroke: "#FA8B7E", strokeWidth: 2 }}
              />
            </svg>
          </div>

          <button
            onClick={onOpen}
            className="bg-yellow-400 flex items-center justify-center z-[15] w-[25px] h-[25px] rounded-full border-none font-bold text-center cursor-pointer absolute top-[calc(207px-25px)] left-[calc(163px-25px)]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Envelope;
