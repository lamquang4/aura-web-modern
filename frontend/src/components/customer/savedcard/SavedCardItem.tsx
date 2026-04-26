import { Link } from "react-router-dom";
import type { SavedCardListItemResponse } from "../../../types/type";
import CardActionMenu from "./CardActionMenu";
import Image from "../../ui/Image";
import { useEffect, useState } from "react";
import { EllipsisVertical } from "lucide-react";

interface SavedCardItemProps {
  savedCard: SavedCardListItemResponse;
}

function SavedCardItem({ savedCard }: SavedCardItemProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    if (!openDropdown) return;
    const handler = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".menu-dropdown")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [openDropdown]);

  const handleToggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdown(
      openDropdown === savedCard.savedCardId ? null : savedCard.savedCardId,
    );
  };

  return (
    <div className="flex flex-col gap-[10px] relative card-save">
      <div className="relative w-full aspect-[4/3] bg-[#e1e4e7] rounded-sm overflow-hidden">
        <Link
          to={`/card/${savedCard.savedCardId}`}
          className="absolute inset-0 flex items-center justify-center p-[15px]"
        >
          <Image
            source={savedCard.card.frontImage}
            alt={""}
            className={"w-full h-full object-contain"}
            loading="lazy"
          />
        </Link>

        <button
          className="absolute top-[8px] right-[8px] w-[30px] h-[30px] p-1 bg-white flex justify-center items-center rounded-sm"
          onClick={handleToggleDropdown}
        >
          <EllipsisVertical size={20} />
        </button>

        {openDropdown === savedCard.savedCardId && (
          <CardActionMenu
            cardId={savedCard.savedCardId}
            onClose={() => setOpenDropdown(null)}
          />
        )}
      </div>

      <div className="space-y-1">
        <h5 className="font-medium text-[0.95rem] truncate">
          {savedCard.customName}
        </h5>
        <p className="text-[0.85rem] text-gray-500">
          {new Date(savedCard.createdAt).toLocaleString("en-GB")}
        </p>
      </div>
    </div>
  );
}

export default SavedCardItem;
