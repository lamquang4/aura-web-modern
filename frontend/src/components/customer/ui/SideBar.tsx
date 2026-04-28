import { Link, useLocation } from "react-router-dom";
import Button from "../../ui/Button";
import { DoorOpen, IdCardLanyard, User, UserStar } from "lucide-react";
import { useGetMe } from "../../../hooks/queries/useUsers";
import { useLogout } from "../../../hooks/queries/useAuth";

function SideBar() {
  const location = useLocation();
  const pathname = location.pathname;

  const { data: accountData } = useGetMe();
  const account = accountData?.data;

  const { logout } = useLogout();

  return (
    <div className="w-full max-w-full lg:max-w-[300px] self-start lg:sticky lg:top-[5rem] bg-white ">
      <div className="text-[0.9rem] font-medium">
        <div className="px-3.5 py-3 flex gap-5 items-center">
          <UserStar size={20} />

          <div>
            <h5 className="font-medium">Tài khoản của</h5>
            <p className="font-normal">{account?.fullname}</p>
          </div>
        </div>

        <Link
          to="/account/profile"
          className={`border-l-4 py-3 px-3.5 ${
            pathname === "/account/profile"
              ? "bg-gray-100 border-primary"
              : "hover:bg-gray-100 border-transparent"
          }`}
        >
          <div className="flex items-center gap-5">
            <User size={20} />
            <span>Thông tin tài khoản</span>
          </div>
        </Link>

        <Link
          to="/saved"
          className={`border-l-4 py-3 px-3.5  ${
            pathname === "/saved"
              ? "bg-gray-100 border-primary"
              : "hover:bg-gray-100 border-transparent"
          }`}
        >
          <div className="flex items-center gap-5">
            <IdCardLanyard size={20} />
            <span>Thiệp của tôi</span>
          </div>
        </Link>

        <Button
          type="button"
          onClick={logout}
          className="border-l-4 border-transparent py-3 px-3.5 text-left text-danger font-medium hover:bg-gray-100 w-full"
        >
          <div className="flex items-center gap-5">
            <DoorOpen size={20} />

            <span>Đăng xuất</span>
          </div>
        </Button>
      </div>
    </div>
  );
}

export default SideBar;
