import { memo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import SuggestionCard from "../../ui/SuggestionCard";

function SearchDesktop() {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = search.trim();
    if (!query) return;

    const isProductsPage = location.pathname.startsWith("/products");

    const target = isProductsPage
      ? `${location.pathname}?q=${encodeURIComponent(query)}`
      : `/products/all?q=${encodeURIComponent(query)}`;

    navigate(target);
    setSearch("");
  };

  return (
    <div className="relative w-full flex-1">
      <form
        onSubmit={handleSearch}
        className={`flex items-stretch w-ful overflow-hidden duration-200 border border-gray-300 focus-within:border-primary rounded-lg font-medium`}
      >
        <Button className="font-medium px-2" type="submit">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-search-icon lucide-search"
          >
            <path d="m21 21-4.34-4.34" />
            <circle cx="11" cy="11" r="8" />
          </svg>
        </Button>

        <Input
          type="search"
          className={`w-full py-2 pr-2 text-[0.9rem] bg-transparent outline-none border-none`}
          required
          maxLength={100}
          placeholder="Bạn cần tìm gì..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setTimeout(() => {
              setFocused(false);
            }, 200);
          }}
        />
      </form>

      {focused && search && (
        <div className="absolute top-[110%] left-0 w-full z-20 bg-white shadow-lg border border-gray-100 rounded-md py-2">
          <SuggestionCard search={search} />
        </div>
      )}
    </div>
  );
}

export default memo(SearchDesktop);
