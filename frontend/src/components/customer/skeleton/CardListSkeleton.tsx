import { memo } from "react";

type Props = {
  count: number;
};

function CardListSkeleton({ count }: Props) {
  return (
    <div className="grid grid-cols-2 gap-x-[12px] gap-y-[35px] lg:grid-cols-3 2xl:grid-cols-4 sm:grid-cols-2">
      {Array.from({ length: count }).map((_, index) => (
        <div className="animate-pulse space-y-[15px]" key={index}>
          <div className="w-full pt-[120%] bg-gray-200 relative" />

          <div className="space-y-[6px]">
            <div className="h-[14px] bg-gray-200 rounded w-3/4 mx-auto" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default memo(CardListSkeleton);
