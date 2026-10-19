import { memo, useState, type ReactNode } from "react";
import Image from "../../ui/Image";
import { Link, useLocation } from "react-router-dom";
import Button from "../../ui/Button";
import {
  ChevronDown,
  ChevronUp,
  IdCardLanyard,
  UsersRound,
} from "lucide-react";
import Overlay from "../../ui/Overlay";
import { twMerge } from "tailwind-merge";
interface Props {
  menuOpen: boolean;
  onToggleMenu: () => void;
}

interface MenuChild {
  label: string;
  path: string;
}

interface MenuItemBase {
  icon: ReactNode;
  label: string;
}

interface MenuItemWithChildren extends MenuItemBase {
  key: string;
  children: MenuChild[];
  path?: never;
}

interface MenuItemSingle extends MenuItemBase {
  path: string;
  children?: never;
  key?: never;
}

type MenuItem = MenuItemWithChildren | MenuItemSingle;

interface MenuGroup {
  title?: string;
  items: MenuItem[];
}

const menuData: MenuGroup[] = [
  {
    title: "Thiệp",
    items: [
      {
        icon: <IdCardLanyard size={20} />,
        label: "Thiệp",
        key: "2a",
        children: [
          { label: "Danh sách thiệp", path: "/admin/cards" },
          { label: "Thêm thiệp", path: "/admin/cards/create" },
        ],
      },
    ],
  },
  {
    title: "Người dùng",
    items: [
      {
        icon: <UsersRound size={20} />,
        label: "Người dùng",
        key: "5a",
        children: [
          { label: "Danh sách người dùng", path: "/admin/users" },
          { label: "Thêm người dùng", path: "/admin/users/create" },
        ],
      },
    ],
  },
];

function SideBar({ menuOpen, onToggleMenu }: Props) {
  const location = useLocation();
  const pathname = location.pathname;
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleOpen = (menu: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menu]: !prev[menu],
    }));
  };

  return (
    <>
      <aside
        className={twMerge(
          "fixed top-0 left-0 z-100 h-screen w-[320px] transition-transform duration-300 ease-in-out",
          "xl:sticky xl:translate-x-0 xl:shrink-0 xl:overflow-hidden xl:transition-[width]",
          menuOpen ? "translate-x-0" : "-translate-x-full",
          menuOpen ? "xl:w-0" : "xl:w-[320px]",
        )}
      >
        <nav className="custom-scroll h-full w-[320px] overflow-y-auto bg-white pb-5">
          <div className="mb-[20px] flex justify-center sticky top-0 px-3.5 py-4.5">
            <Link to="/">
              <Image
                src={"/assets/logo.png"}
                alt="logo"
                className="w-[90px]"
                loading="eager"
              />
            </Link>
          </div>
          <ul className="flex flex-col gap-[15px] font-medium px-3.5">
            {menuData.map((group, groupIndex) => (
              <div key={groupIndex} className="flex flex-col gap-[10px]">
                <p className="uppercase">{group.title}</p>
                {group.items.map((item, index) => (
                  <li key={index}>
                    {item.children ? (
                      <>
                        <div
                          onClick={() => toggleOpen(item.key)}
                          className={`${
                            openMenus[item.key] ||
                            item.children.some(
                              (child) => pathname === child.path,
                            )
                              ? "text-primary"
                              : "hover:bg-muted"
                          } rounded-lg p-3 w-full cursor-pointer flex justify-between items-center`}
                        >
                          <p className="flex items-center gap-[10px]">
                            {item.icon} {item.label}
                          </p>
                          <Button>
                            {openMenus[item.key] ||
                            item.children.some(
                              (child) => pathname === child.path,
                            ) ? (
                              <ChevronDown size={18} />
                            ) : (
                              <ChevronUp size={18} />
                            )}
                          </Button>
                        </div>
                        <ul
                          className={`max-h-0 overflow-hidden invisible transition-all duration-600 ease-in-out pl-[25px] ${
                            openMenus[item.key] ||
                            item.children.some(
                              (child) => pathname === child.path,
                            )
                              ? "max-h-fit visible"
                              : ""
                          }`}
                        >
                          {item.children.map((child, childIndex) => (
                            <li
                              key={childIndex}
                              className={`rounded-lg w-full cursor-pointer my-[5px] ${
                                pathname === child.path
                                  ? "text-white bg-primary"
                                  : "hover:bg-muted"
                              }`}
                            >
                              <Link to={child.path} className="p-3">
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <Link
                        to={item.path}
                        className={`${
                          pathname === item.path
                            ? "text-white bg-primary"
                            : "hover:bg-muted"
                        } rounded-lg p-3 w-full cursor-pointer flex justify-between items-center`}
                      >
                        <p className="flex items-center gap-[10px]">
                          {item.icon} {item.label}
                        </p>
                      </Link>
                    )}
                  </li>
                ))}
              </div>
            ))}
          </ul>
        </nav>
      </aside>

      {menuOpen && <Overlay className="xl:hidden" onClose={onToggleMenu} />}
    </>
  );
}

export default memo(SideBar);
