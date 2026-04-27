import { useSearchParams } from "react-router-dom";
import Pagination from "../ui/Pagination";
import SavedCardItem from "./SavedCardItem";
import { useGetSavedCards } from "../../../hooks/queries/useSavedCards";
import SavedCardSkeletonList from "../skeleton/SavedCardListSkeleton";
import Image from "../../ui/Image";
function SavedCardList() {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading } = useGetSavedCards({ page, limit: 6 });
  const savedCards = data?.data ?? [];
  const totalItems = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;
  return (
    <div className="w-full flex-1 px-[15px] bg-white">
      <div className="space-y-[20px]">
        <h2>Thiệp của tôi</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {isLoading ? (
            <SavedCardSkeletonList />
          ) : savedCards.length > 0 ? (
            savedCards.map((savedCard) => (
              <SavedCardItem savedCard={savedCard} />
            ))
          ) : (
            <div className="flex justify-center items-center h-[60vh]">
              <div className="flex flex-col justify-center items-center gap-[15px]">
                <Image
                  source={"/assets/empty.png"}
                  className={"w-[120px]"}
                  alt={"empty"}
                  loading="eager"
                />

                <h4>
                  Hãy chọn thiệp và viết những lời chúc
                  <br />
                  cho người thân, bạn bè của bạn
                </h4>
              </div>
            </div>
          )}
        </div>

        <Pagination
          totalPages={totalPages}
          currentPage={page}
          totalItems={totalItems}
        />
      </div>
    </div>
  );
}

export default SavedCardList;
