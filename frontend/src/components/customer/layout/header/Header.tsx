import { Link } from "react-router-dom";
import Image from "../../../ui/Image";
import SearchDesktop from "./SearchDesktop";
import ProfileMenu from "./ProfileMenu";
import { useCallback, useEffect, useState } from "react";
import SearchMobile from "./SearchMobile";
import Overplay from "../../ui/Overplay";
import AuthModal from "../auth/AuthModal";
import Button from "../../../ui/Button";
import { Search, UserRound } from "lucide-react";

function Header() {
  const [searchOpen, setSearchOpen] = useState<boolean>(false);

  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);

  const toggleProfileMenu = useCallback(() => {
    setProfileMenuOpen((prev) => !prev);
    setSearchOpen(false);
  }, []);

  const toggleSearch = useCallback(() => {
    setSearchOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSearchOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <header className="w-full bg-white sticky top-0 border-b border-gray-200 z-15">
        <div className="py-4 px-4 relative">
          <div className="w-full max-w-[1200px] mx-auto flex justify-between items-center">
            <Link to={"/"}>
              <Image
                source={"/assets/logo.png"}
                alt={"logo"}
                className={"w-[80px]"}
                loading="eager"
              />
            </Link>

            <div className="hidden lg:flex w-[50%]">
              <SearchDesktop />
            </div>

            <div className="hidden lg:flex items-center gap-[15px]">
              <div
                className="relative cursor-pointer transition-colors group"
                onMouseEnter={toggleProfileMenu}
                onMouseLeave={toggleProfileMenu}
              >
                <div
                  className={`flex items-center gap-1 hover:text-white hover:bg-primary px-2 py-1.5 rounded-md group-hover:bg-primary group-hover:text-white`}
                >
                  <UserRound size={24} />
                  <span className="font-medium">Tài khoản</span>
                </div>

                <ProfileMenu profileMenuOpen={profileMenuOpen} />
              </div>
            </div>

            {/* Mobile */}
            <div className="flex lg:hidden items-center gap-4 relative">
              <Button onClick={toggleSearch}>
                <Search size={24} />
              </Button>

              <div
                className="relative cursor-pointer group"
                onMouseEnter={toggleProfileMenu}
                onMouseLeave={toggleProfileMenu}
              >
                <UserRound strokeWidth={1.5} size={24} />
                <ProfileMenu profileMenuOpen={profileMenuOpen} />
              </div>
            </div>
          </div>

          <SearchMobile onToggleSearch={toggleSearch} searchOpen={searchOpen} />
        </div>
      </header>

      <AuthModal />

      {searchOpen && <Overplay onClose={toggleSearch} IndexForZ={14} />}
    </>
  );
}

export default Header;
