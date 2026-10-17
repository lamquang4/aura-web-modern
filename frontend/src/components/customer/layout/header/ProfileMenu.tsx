import { memo } from "react";
import { openAuthModal } from "../../../../store/slices/authModalSlice";
import { useGetMe } from "../../../../hooks/queries/useUsers";
import { useLogout } from "../../../../hooks/queries/useAuth";
import { useAppDispatch } from "../../../../store/store";
import DropdownMenu, { type DropdownMenuItem } from "../../../ui/DropdownMenu";

interface Props {
  profileMenuOpen: boolean;
}

function ProfileMenu({ profileMenuOpen }: Props) {
  const { data: accountData, isLoading } = useGetMe();
  const account = accountData?.data;

  const { logout } = useLogout();
  const dispatch = useAppDispatch();

  if (!profileMenuOpen || isLoading) return null;

  const items: DropdownMenuItem[] = account
    ? [
        { label: "Thông tin tài khoản", href: "/account/profile" },
        { label: "Thiệp của tôi", href: "/saved" },
        { label: "Đăng xuất", onClick: logout, textColor: "text-danger" },
      ]
    : [
        { label: "Đăng nhập", onClick: () => dispatch(openAuthModal("login")) },
        {
          label: "Đăng ký",
          onClick: () => dispatch(openAuthModal("register")),
        },
      ];

  return (
    <DropdownMenu
      items={items}
      horizontal="right"
      vertical="bottom"
      header={
        account && (
          <p className="border-b px-2.5 py-3 border-border max-w-[210px] overflow-hidden text-ellipsis whitespace-nowrap text-center font-medium">
            Xin chào, {account.fullname}
          </p>
        )
      }
    />
  );
}

export default memo(ProfileMenu);
