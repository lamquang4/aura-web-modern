import ToolTip from "../ui/ToolTip";
import { Play } from "lucide-react";
import Button from "../../ui/Button";

interface Props {
  onReset: () => void;
}

function ActionButtons({ onReset }: Props) {
  return (
    <div className="flex flex-col gap-[15px] justify-center items-center">
      <div className="group relative">
        <Button
          type="button"
          onClick={onReset}
          className="w-[38px] h-[38px] flex justify-center items-center rounded-full border border-black p-1 hover-scale"
        >
          <Play size={24} strokeWidth={1.5} />
        </Button>

        <ToolTip text="Phát lại" />
      </div>
    </div>
  );
}

export default ActionButtons;
