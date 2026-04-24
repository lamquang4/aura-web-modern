import { mockSavedCardList } from "../../../mocks/mockSavedCardList";
import Image from "../../ui/Image";
import Loading from "../../ui/Loading";
import Pagination from "../ui/Pagination";
import SavedCardItem from "./SavedCardItem";

function SavedCardList() {
  const savedcards = mockSavedCardList;
  const isLoading = false;
  const totalPages = 1;
  const currentPage = 1;
  const totalItems = 12;
  return (
    <div className="w-full flex-1 px-[15px] bg-white">
      <div className="space-y-[20px]">
        <h2>Thiệp của tôi</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {isLoading ? (
            <Loading height={60} size={50} color="black" thickness={2} />
          ) : savedcards.length > 0 ? (
            savedcards.map((savedcard) => (
              <SavedCardItem savedcard={savedcard} />
            ))
          ) : (
            <div className="flex justify-center items-center h-[60vh]">
              <div className="flex flex-col justify-center items-center gap-[15px]">
                <Image
                  source={"/assets/empty1.png"}
                  alt={""}
                  className={"w-[120px]"}
                  loading="eager"
                />

                <h4>Không có đơn hàng nào</h4>
              </div>
            </div>
          )}
        </div>

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          totalItems={totalItems}
        />
      </div>
    </div>
  );
}

export default SavedCardList;
