import { Link } from "react-router-dom";
import Image from "../../ui/Image";
import Button from "../../ui/Button";

interface Props {
  isLoadingSave: boolean;
}

function DesignCardHeader({ isLoadingSave }: Props) {
  return (
    <header className="w-full bg-white sticky top-0 border-b border-border z-15">
      <div className="py-4 px-4 relative">
        <div className="w-full max-w-[1200px] mx-auto flex justify-between items-center">
          <Link to="/">
            <Image
              src="/assets/logo.png"
              alt="logo"
              className="w-[80px]"
              loading="eager"
            />
          </Link>

          <div className="flex gap-3">
            <Button
              type="submit"
              form="form-design"
              disabled={isLoadingSave}
              className="p-[8px_12px] bg-info text-white text-[0.9rem] rounded-md font-medium hover-scale"
            >
              {isLoadingSave ? "Đang lưu..." : "Lưu"}
            </Button>

            <Link
              to="/cards"
              className="p-[8px_12px] bg-danger text-white text-[0.9rem] rounded-md font-medium hover-scale"
            >
              Trở về
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

export default DesignCardHeader;
