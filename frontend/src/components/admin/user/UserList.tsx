import Pagination from "../ui/Pagination";
import FilterDropDownMenu from "../ui/FilterDropDownMenu";
import Image from "../../ui/Image";
import Loading from "../../ui/Loading";
import InputSearch from "../ui/InputSearch";
import ListHeader from "../ui/list/ListHeader";
import ListBody from "../ui/list/ListBody";
import Button from "../../ui/Button";
import { USER_STATUS_OPTIONS } from "../../../constants/filterOptions";
import { mockUsers } from "../../../mocks/mockUsers";
import { LockKeyhole, LockKeyholeOpen, SquarePen, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

function UserList() {
  const totalItems = 12;
  const totalPages = 1;
  const limit = 12;
  const currentPage = 1;
  const isLoading = false;
  const isLoadingUpdate = false;
  const isLoadingDelete = false;

  const users = mockUsers;

  const handleDelete = async (id: string) => {
    if (!id) {
      return;
    }

    /*
    if (id === account?.id) {
      toast.error("Bạn không thể xóa chính tài khoản của mình");
      return;
    }
      */
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    if (!id && !status) {
      return;
    }
  };

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

        <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full text-[0.9rem]">
          <thead>
            <tr className="bg-[#E9EDF2] text-left">
              <th className="p-[1rem]">Họ tên</th>

              <th className="p-[1rem]">Email</th>

              <th className="p-[1rem]">
                <FilterDropDownMenu
                  title="Tình trạng"
                  array={USER_STATUS_OPTIONS}
                  paramName="status"
                />
              </th>
              <th className="p-[1rem]  ">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr>
                <td colSpan={8} className="w-full">
                  <Loading height={60} size={50} color="black" thickness={2} />
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user) => (
                <tr key={user.userId} className="hover:bg-[#f2f3f8]">
                  <td className="p-[1rem] text-[0.9rem] font-semibold">
                    {user.fullname}
                  </td>
                  <td className="p-[1rem]  ">{user.email}</td>

                  <td className="p-[1rem]">
                    {user.status === "ACTIVE" && "Bình thường"}
                    {user.status === "LOCKED" && "Bị khóa"}
                  </td>
                  <td className="p-[1rem]  ">
                    <div className="flex items-center gap-[15px]">
                      <Button
                        disabled={isLoadingUpdate}
                        onClick={() =>
                          handleUpdateStatus(
                            user.userId || "",
                            user.status === "ACTIVE" ? "LOCKED" : "ACTIVE",
                          )
                        }
                      >
                        {user.status === "ACTIVE" ? (
                          <LockKeyhole
                            strokeWidth={1.5}
                            size={22}
                            className="text-neutral"
                          />
                        ) : (
                          <LockKeyholeOpen
                            strokeWidth={1.5}
                            size={22}
                            className="text-neutral"
                          />
                        )}
                      </Button>

                      <Link to={`/admin/users/edit/${user.userId}`}>
                        <SquarePen
                          size={22}
                          strokeWidth={1.5}
                          className="text-info"
                        />
                      </Link>

                      <Button
                        disabled={isLoadingDelete}
                        onClick={() => handleDelete(user.userId || "")}
                      >
                        <Trash2
                          size={22}
                          strokeWidth={1.5}
                          className="text-danger"
                        />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="w-full h-[70vh]">
                  <div className="flex justify-center items-center">
                    <Image
                      source={"/assets/notfound1.webp"}
                      alt={""}
                      className={"w-[135px]"}
                      loading="lazy"
                    />
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </ListBody>

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        limit={limit}
        totalItems={totalItems}
      />
    </>
  );
}

export default UserList;
