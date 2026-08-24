import { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../../ui/Input";
import Button from "../../../ui/Button";
import SuggestionCard from "../../ui/SuggestionCard";
import { Search } from "lucide-react";

function SearchDesktop() {
  const navigate = useNavigate();

  const [search, setSearch] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const query = search.trim();
    if (!query) return;

    const target = `/cards?q=${encodeURIComponent(query)}`;

    navigate(target);
    setSearch("");
  };

  return (
    <div className="relative w-full flex-1">
      <form
        onSubmit={handleSearch}
        className={`flex items-stretch w-ful overflow-hidden duration-200 border border-neutral-200 focus-within:border-primary rounded-lg font-medium`}
      >
        <Button className="font-medium px-2" type="submit">
          <Search size={24} strokeWidth={1.5} />
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
        <SuggestionCard
          search={search}
          className="absolute top-[110%] left-0 w-full z-20 bg-white shadow-lg border border-neutral-200 rounded-md py-2"
        />
      )}
    </div>
  );
}

export default memo(SearchDesktop);
