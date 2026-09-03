import { memo } from "react";

interface Props {
  count: number;
}

function CardListSkeleton({ count }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-[12px] gap-y-[35px]">
      {Array.from({ length: count }).map((_, index) => (
        <div className="animate-pulse space-y-[15px]" key={index}>
          <div className="w-full pt-[120%] bg-skeleton relative" />

          <div className="space-y-[6px]">
            <div className="h-[14px] bg-skeleton rounded w-3/4 mx-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default memo(CardListSkeleton);
