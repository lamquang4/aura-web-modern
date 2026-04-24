import { mockCardList } from "../../../mocks/mockCardLists";
import Pagination from "../ui/Pagination";
import CardList from "./CardList";

function CardListContainer() {
  const cards = mockCardList;
  const isLoading = false;
  const totalItems = cards.length;
  const totalPages = 1;
  const currentPage = 1;
  return (
    <section className="my-[40px] px-[15px]">
      <div className="mx-auto max-w-[1200px] w-full">
        <CardList
          cards={cards}
          title={"Tất cả thiệp"}
          isLoading={isLoading}
          total={totalItems}
        />

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          totalItems={totalItems}
        />
      </div>
    </section>
  );
}

export default CardListContainer;
