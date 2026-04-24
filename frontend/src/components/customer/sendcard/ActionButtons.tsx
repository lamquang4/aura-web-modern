import { motion } from "framer-motion";
import ToolTip from "../ui/ToolTip";
import { Play } from "lucide-react";

interface Props {
  onReset: () => void;
}

function ActionButtons({ onReset }: Props) {
  return (
    <div className="flex flex-col gap-[15px] justify-center items-center">
      <div className="group relative">
        <motion.button
          whileHover={{ scale: 1.1, rotate: -10 }}
          whileTap={{ scale: 0.9 }}
          type="button"
          onClick={onReset}
          className="w-[35px] h-[35px] flex justify-center items-center rounded-full border border-black p-1"
        >
          <Play size={22} />
        </motion.button>

        <ToolTip text="Phát lại" />
      </div>
    </div>
  );
}

export default ActionButtons;
