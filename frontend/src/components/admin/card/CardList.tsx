import Pagination from "../ui/Pagination";
import ListBody from "../ui/list/ListBody";
import InputSearch from "../ui/InputSearch";
import ListHeader from "../ui/list/ListHeader";
import FilterDropDownMenu from "../ui/FilterDropDownMenu";
import { CARD_STATUS_OPTIONS } from "../../../constants/filterOptions";
import Loading from "../../ui/Loading";
import Image from "../../ui/Image";
import Button from "../../ui/Button";
import { Eye, EyeOff, SquarePen, Trash2 } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import {
  useDeleteCard,
  useGetAllCards,
  useUpdateCardStatus,
} from "../../../hooks/queries/useCards";
import Swal from "sweetalert2";

function CardList() {
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const limit = Number(searchParams.get("limit")) || 12;
  const q = searchParams.get("q") || undefined;
  const status = searchParams.get("status") || undefined;

  const { data, isLoading } = useGetAllCards({ page, limit, q, status });
  const { mutate: updateStatus, isPending: isLoadingUpdate } =
    useUpdateCardStatus();
  const { mutate: deleteCard, isPending: isLoadingDelete } = useDeleteCard();

  const cards = data?.data ?? [];
  const totalItems = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;

  const handleDelete = async (cardId: string) => {
    const result = await Swal.fire({
      title: "Xác nhận xóa thiệp",
      text: "Bạn có chắc chắn muốn xóa thiệp này không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    });

    if (!result.isConfirmed) return;

    deleteCard(cardId);
  };

  const handleUpdateStatus = async (cardId: string, status: string) => {
    const result = await Swal.fire({
      title:
        status === "INACTIVE" ? "Xác nhận ẩn thiệp" : "Xác nhận hiện thiệp",
      text:
        status === "INACTIVE" ? "Thiệp này sẽ bị ẩn" : "Thiệp này sẽ được hiện",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
    });

    if (!result.isConfirmed) return;

    updateStatus(cardId);
  };

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

        <table className="w-[350%] border-collapse sm:w-[220%] xl:w-full text-[0.9rem]">
          <thead>
            <tr className="bg-[#E9EDF2] text-left">
              <th className="p-[1rem]">Tên</th>
              <th className="p-[1rem]">Hình mặt trước</th>
              <th className="p-[1rem]">Hình mặt sau</th>
              <th className="p-[1rem]">
                <FilterDropDownMenu
                  title="Tình trạng"
                  array={CARD_STATUS_OPTIONS}
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
            ) : cards.length > 0 ? (
              cards.map((card) => (
                <tr key={card.cardId} className="hover:bg-[#f2f3f8]">
                  <td className="p-[1rem] text-[0.9rem] font-semibold">
                    {card.name}
                  </td>
                  <td className="p-[1rem]">
                    <div className="relative group w-[80px] h-[80px] overflow-hidden">
                      <Image
                        source={`${card.frontImage}`}
                        alt={card.name}
                        className={
                          "w-full h-full object-contain z-1 relative shadow-lg"
                        }
                        loading="lazy"
                      />
                    </div>
                  </td>

                  <td className="p-[1rem]">
                    {card.backImage && (
                      <div className="relative group w-[80px] h-[80px] overflow-hidden">
                        <Image
                          source={`${card.backImage}`}
                          alt={card.name}
                          className={
                            "w-full h-full object-contain z-1 relative shadow-lg"
                          }
                          loading="lazy"
                        />
                      </div>
                    )}
                  </td>

                  <td className="p-[1rem]">
                    {card.status === "ACTIVE" && "Hiện"}
                    {card.status === "INACTIVE" && "Ẩn"}
                  </td>
                  <td className="p-[1rem]  ">
                    <div className="flex items-center gap-[15px]">
                      <Button
                        disabled={isLoadingUpdate}
                        onClick={() =>
                          handleUpdateStatus(
                            card.cardId,
                            card.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
                          )
                        }
                      >
                        {card.status === "ACTIVE" ? (
                          <Eye
                            strokeWidth={1.5}
                            size={22}
                            className="text-neutral"
                          />
                        ) : (
                          <EyeOff
                            strokeWidth={1.5}
                            size={22}
                            className="text-neutral"
                          />
                        )}
                      </Button>

                      <Link to={`/admin/cards/edit/${card.cardId}`}>
                        <SquarePen
                          size={22}
                          strokeWidth={1.5}
                          className="text-info"
                        />
                      </Link>

                      <Button
                        disabled={isLoadingDelete}
                        onClick={() => handleDelete(card.cardId || "")}
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
        currentPage={page}
        limit={limit}
        totalItems={totalItems}
      />
    </>
  );
}

export default CardList;
