import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Image from "../../ui/Image";

interface Props {
  isLoadingSave: boolean;
}

function DesignCardHeader({ isLoadingSave }: Props) {
  return (
    <header className="w-full bg-white sticky top-0 border-b border-gray-200 z-15">
      <div className="py-4 px-4 relative">
        <div className="w-full max-w-[1200px] mx-auto flex justify-between items-center">
          <Link to="/">
            <Image
              source="/assets/logo.png"
              alt="logo"
              className="w-[80px]"
              loading="eager"
            />
          </Link>

          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              form="form-design"
              disabled={isLoadingSave}
              className="p-[6px_10px] bg-primary text-white text-[0.9rem] rounded-md"
            >
              {isLoadingSave ? "Đang lưu..." : "Lưu"}
            </motion.button>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/cards/all"
                className="p-[6px_10px] bg-danger text-white text-[0.9rem] rounded-md"
              >
                Trở về
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DesignCardHeader;
