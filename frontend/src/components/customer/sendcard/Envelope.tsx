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

          <motion.div
            className="absolute top-0 left-0 z-[11]"
            initial={false}
            animate={{ rotateX: isOpened ? -55 : 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            style={{ transformOrigin: "50% 100%", perspective: 800 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" height="300" width="300">
              <polygon
                points="0,100 150,200 300,100"
                style={{ fill: "#FA8B7E", stroke: "#FA8B7E", strokeWidth: 2 }}
              />
            </svg>
          </motion.div>

          <Button
            onClick={onOpen}
            className="z-20 bg-yellow-400 w-[25px] h-[25px] rounded-full absolute top-[182px] left-[138px] hover:scale-110"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Envelope;
