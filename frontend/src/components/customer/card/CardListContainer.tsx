import { useSearchParams } from "react-router-dom";

import Pagination from "../ui/Pagination";
import CardList from "./CardList";
import { useGetActiveCards } from "../../../hooks/queries/useCards";

function CardListContainer() {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 10;
  const q = searchParams.get("q") || undefined;

  const { data, isLoading } = useGetActiveCards({ page, limit, q });
  const cards = data?.data ?? [];
  const totalItems = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;

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
          currentPage={page}
          totalItems={totalItems}
        />
      </div>
    </section>
  );
}

export default CardListContainer;
