import { Link } from "react-router-dom";
import Image from "../../ui/Image";
function Footer() {
  return (
    <footer className="bg-neutral-100 border-t border-neutral-200 px-[15px] text-neutral-300">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 py-8">
          <div className="col-span-full lg:col-span-1  space-y-4">
            <Link to={"/"}>
              <Image
                src={"/assets/logo.png"}
                alt={"logo"}
                className={"w-[80px]"}
                loading="eager"
              />
            </Link>
            <p className="font-meidum">
              Aura cho phép bạn có thể lưu giữ những lời chúc chân thành và gửi
              đi những tấm thiệp đầy ý nghĩa đến những người bạn yêu thương
            </p>
          </div>

          <div className="lg:mx-auto text-left space-y-4">
            <h5 className="relative font-bold text-black uppercase">
              Các trang
            </h5>
            <ul className="transition-all duration-500 text-[0.9rem] space-y-4">
              <li>
                <Link
                  to="/"
                  className=" font-medium text-[0.9rem] hover:text-black"
                >
                  Trang chủ
                </Link>
              </li>

              <li>
                <Link
                  to={"/cards"}
                  className="font-medium text-[0.9rem] hover:text-black"
                >
                  Tất cả thiệp
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:mx-auto text-left space-y-4">
            <h5 className="relative font-bold text-black uppercase">
              Các trang
            </h5>
            <ul className="transition-all duration-500 text-[0.9rem] space-y-4">
              <li>
                <Link
                  to="/"
                  className=" font-medium text-[0.9rem] hover:text-black"
                >
                  Trang chủ
                </Link>
              </li>

              <li>
                <Link
                  to={"/cards"}
                  className="font-medium text-[0.9rem] hover:text-black"
                >
                  Tất cả thiệp
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:mx-auto text-left space-y-4">
            <h5 className="relative font-bold text-black uppercase">
              Các trang
            </h5>
            <ul className="transition-all duration-500 text-[0.9rem] space-y-4">
              <li>
                <Link
                  to="/"
                  className=" font-medium text-[0.9rem] hover:text-black"
                >
                  Trang chủ
                </Link>
              </li>

              <li>
                <Link
                  to={"/cards"}
                  className="font-medium text-[0.9rem] hover:text-black"
                >
                  Tất cả thiệp
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="py-4 border-t border-neutral-200 text-center">
          <p className="font-medium">© Vietnam 2026</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
