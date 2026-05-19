import Pagination from "../ui/Pagination";
import ListBody from "../ui/list/ListBody";
import InputSearch from "../ui/InputSearch";
import ListHeader from "../ui/list/ListHeader";
import { useSearchParams } from "react-router-dom";
import { useGetAllCards } from "../../../hooks/queries/useCards";
import CardTable from "./CardTable";

function CardList() {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 12;
  const q = searchParams.get("q") || undefined;
  const status = searchParams.get("status") || undefined;

  const { data, isLoading } = useGetAllCards({ page, limit, q, status });

  const cards = data?.data ?? [];
  const totalItems = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;

  return (
    <>
      <ListHeader
        title="Thiệp"
        totalItems={totalItems}
        addLink="/admin/cards/create"
      />

      <ListBody>
        <div className="p-[1.2rem]">
          <InputSearch />
        </div>

        <CardTable cards={cards} isLoading={isLoading} />
      </ListBody>

      <Pagination
        totalPages={totalPages}
        currentPage={page}
        limit={limit}
        totalItems={totalItems}
      />
    </>
  );
}

export default CardList;
