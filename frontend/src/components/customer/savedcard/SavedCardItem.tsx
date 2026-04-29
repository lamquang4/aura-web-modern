import { Link } from "react-router-dom";
import type { SavedCardListItemResponse } from "../../../types/type";
import CardActionMenu from "./CardActionMenu";
import Image from "../../ui/Image";
import { useEffect, useRef, useState } from "react";
import { EllipsisVertical } from "lucide-react";

interface SavedCardItemProps {
  savedCard: SavedCardListItemResponse;
}

function SavedCardItem({ savedCard }: SavedCardItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  const handleToggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-[10px] relative">
      <div
        className="relative w-full aspect-[4/3] rounded-sm bg-gray-200"
        ref={containerRef}
      >
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

        {isOpen && (
          <CardActionMenu
            cardId={savedCard.savedCardId}
            onClose={() => setIsOpen(false)}
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
