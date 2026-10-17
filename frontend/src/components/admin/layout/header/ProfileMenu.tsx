import { memo, useState } from "react";
import Image from "../../../ui/Image";
import { CircleUserRound, DoorOpen } from "lucide-react";
import { useGetMe } from "../../../../hooks/queries/useUsers";
import { useLogout } from "../../../../hooks/queries/useAuth";
import type { DropdownMenuItem } from "../../../ui/DropdownMenu";
import DropdownMenu from "../../../ui/DropdownMenu";

function ProfileMenu() {
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);

  const handleToggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setDropDownOpen((prev) => !prev);
  };

  const { data: accountData } = useGetMe();
  const account = accountData?.data;

  const { logout } = useLogout();

  const items: DropdownMenuItem[] = [
    {
      label: "Tài khoản",
      icon: <CircleUserRound size={22} />,
      href: "/admin/account/profile",
      onClick: close,
    },
    {
      label: "Đăng xuất",
      icon: <DoorOpen size={22} />,
      onClick: () => {
        close();
        logout();
      },
      textColor: "text-danger",
    },
  ];

  if (!account) {
    return;
  }
  return (
    <div
      className="relative"
      onMouseEnter={() => setDropDownOpen(true)}
      onMouseLeave={() => setDropDownOpen(false)}
    >
      <div
        className="flex cursor-pointer items-center gap-2"
        onClick={handleToggleDropdown}
      >
        <div className="w-[34px] h-[34px] p-1 rounded-full border border-border overflow-hidden">
          <Image
            src="/assets/user.png"
            alt=""
            className="w-full h-full object-contain"
            loading="eager"
          />
        </div>
        <p className="font-medium">{account.fullname}</p>
      </div>

      {dropDownOpen && (
        <DropdownMenu items={items} horizontal="right" vertical="bottom" />
      )}
    </div>
  );
}

export default memo(ProfileMenu);
