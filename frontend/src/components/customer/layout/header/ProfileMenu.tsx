import { memo } from "react";
import { Link } from "react-router-dom";
import { openAuthModal } from "../../../../redux/slices/authModalSlice2";
import Button from "../../../ui/Button";
import { useGetMe } from "../../../../hooks/queries/useUsers";
import { useLogout } from "../../../../hooks/queries/useAuth";
import { useAppDispatch } from "../../../../redux/store2";
type Props = {
  profileMenuOpen: boolean;
};

function ProfileMenu({ profileMenuOpen }: Props) {
  const { data: accountData, isLoading } = useGetMe();
  const account = accountData?.data;

  const { logout } = useLogout();

  const dispatch = useAppDispatch();

  if (!profileMenuOpen || isLoading) return null;

  return (
    <div
      className={`text-[0.9rem] font-medium absolute top-full right-0 z-20 bg-white shadow-md rounded-sm overflow-hidden w-max transition-all duration-100 origin-top`}
    >
      {account ? (
        <>
          <p className="border-b p-2.5 border-gray-200 max-w-[210px] overflow-hidden text-ellipsis whitespace-nowrap text-center">
            Xin chào, {account.fullname}
          </p>

          <Link
            className="hover:bg-gray-100 w-full block p-2.5"
            to="/account/profile"
          >
            Thông tin tài khoản
          </Link>

          <Link className="hover:bg-gray-100 w-full block p-2.5" to="/saved">
            Thiệp của tôi
          </Link>

          <Button
            onClick={logout}
            className="hover:bg-gray-100 w-full block p-2.5 text-left"
          >
            Đăng xuất
          </Button>
        </>
      ) : (
        <>
          <Button
            onClick={() => dispatch(openAuthModal("login"))}
            className="hover:bg-gray-100 w-full block p-2.5 text-left"
          >
            Đăng nhập
          </Button>

          <Button
            onClick={() => dispatch(openAuthModal("register"))}
            className="hover:bg-gray-100 w-full block p-2.5 text-left"
          >
            Đăng ký
          </Button>
        </>
      )}
    </div>
  );
}

export default memo(ProfileMenu);
