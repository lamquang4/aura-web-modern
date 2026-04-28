interface Props {
  count?: number;
}

function SavedCardSkeletonList({ count = 6 }: Props) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {Array.from({ length: count }).map((_, index) => (
          <div className="flex flex-col gap-[10px] animate-pulse" key={index}>
            <div className="w-full aspect-[4/3] bg-gray-200 rounded-sm" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default SavedCardSkeletonList;
