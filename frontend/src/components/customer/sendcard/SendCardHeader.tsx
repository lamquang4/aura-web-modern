import { Link } from "react-router-dom";
import Image from "../../ui/Image";
import ActionButtons from "./ActionButtons";

interface Props {
  showButtons: boolean;
  onReset: () => void;
}

function SendCardHeader({ showButtons, onReset }: Props) {
  return (
    <header className="w-full fixed top-0 z-15">
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

          <div className={`${!showButtons && "invisible"}`}>
            <ActionButtons onReset={onReset} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default SendCardHeader;
