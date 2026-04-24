import { Link } from "react-router-dom";
import type { SavedCardListItemResponse } from "../../../types/type";
import CardActionMenu from "./CardActionMenu";
import Image from "../../ui/Image";
import { useEffect, useState } from "react";
import { EllipsisVertical } from "lucide-react";

interface SavedCardItemProps {
  savedcard: SavedCardListItemResponse;
}

function SavedCardItem({ savedcard }: SavedCardItemProps) {
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
      openDropdown === savedcard.savedCardId ? null : savedcard.savedCardId,
    );
  };

  return (
    <div className="flex flex-col gap-[10px] relative card-save">
      <div className="relative w-full aspect-[4/3] bg-[#e1e4e7] rounded-sm overflow-hidden">
        <Link
          to={`/card/${savedcard.savedCardId}`}
          className="absolute inset-0 flex items-center justify-center p-[15px]"
        >
          <Image
            source={savedcard.card.frontImage}
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

        {openDropdown === savedcard.savedCardId && (
          <CardActionMenu
            cardId={savedcard.savedCardId}
            onClose={() => setOpenDropdown(null)}
          />
        )}
      </div>

      <div className="space-y-1">
        <h5 className="font-medium text-[0.95rem] truncate">
          {savedcard.customName}
        </h5>
        <p className="text-[0.85rem] text-gray-500">
          {new Date(savedcard.createdAt).toLocaleString("en-GB")}
        </p>
      </div>
    </div>
  );
}

export default SavedCardItem;
