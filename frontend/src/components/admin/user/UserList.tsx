import Pagination from "../ui/Pagination";
import InputSearch from "../ui/InputSearch";
import ListHeader from "../ui/list/ListHeader";
import ListBody from "../ui/list/ListBody";
import { useSearchParams } from "react-router-dom";
import { useGetAllUsers } from "../../../hooks/queries/useUsers";
import UserTable from "./UserTable";

function UserList() {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 12;
  const q = searchParams.get("q") || undefined;
  const role = searchParams.get("role") || undefined;
  const status = searchParams.get("status") || undefined;

  const { data, isLoading } = useGetAllUsers({ page, limit, q, role, status });

  const users = data?.data ?? [];
  const totalItems = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;

  return (
    <>
      <ListHeader
        title="Người dùng"
        totalItems={totalItems}
        addLink="/admin/users/create"
      />

      <ListBody>
        <div className="p-[1.2rem]">
          <InputSearch />
        </div>

        <UserTable users={users} isLoading={isLoading} />
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

export default UserList;
