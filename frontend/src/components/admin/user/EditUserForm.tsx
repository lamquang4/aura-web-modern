import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import Label from "../../ui/Label";
import {
  useGetMe,
  useGetUserById,
  useUpdateUser,
} from "../../../hooks/queries/useUsers";

function EditUserForm() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({
    fullname: "",
    password: "",
    status: "",
    role: "",
  });

  const { data: userData, isLoading } = useGetUserById(id ?? "");
  const { mutate: updateUser, isPending: isLoadingUpdate } = useUpdateUser();

  const user = userData?.data;

  const { data: accountData } = useGetMe();
  const account = accountData?.data;

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      toast.error("Người dùng không tìm thấy");
      navigate("/admin/users");
      return;
    }

    setData({
      fullname: user.fullname || "",
      password: "",
      status: user.status?.toString() || "",
      role: user.role || "",
    });
  }, [isLoading, user, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (data.password.trim().length < 6 && data.password) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (data.status === "LOCKED" && id === account?.userId) {
      toast.error("Bạn không thể tự khóa chính tài khoản của mình");
      return;
    }

    updateUser(
      {
        userId: id ?? "",
        data: {
          ...data,
          role: data.role as "ADMIN" | "CUSTOMER",
          status: data.status as "ACTIVE" | "LOCKED",
        },
      },
      {
        onSuccess: () => {
          setData((prev) => ({
            ...prev,
            password: "",
          }));
        },
      },
    );
  };

  return (
    <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-full">
      <form className="flex flex-col gap-7 w-full" onSubmit={handleSubmit}>
        <h2 className="text-neutral">Chỉnh sửa người dùng</h2>

        <div className="flex gap-[25px] w-full flex-col">
          <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
            <h5 className="font-bold text-neutral">Thông tin tài khoản</h5>

            <div className="flex flex-col gap-1">
              <Label htmlFor="" required>
                Họ tên
              </Label>
              <Input
                type="text"
                name="fullname"
                value={data.fullname}
                onChange={handleChange}
                required
                className="border border-gray-300 p-[6px_10px] w-full focus:border-gray-400  "
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="" required>
                Email
              </Label>
              <Input
                type="email"
                name="email"
                value={user?.email}
                onChange={handleChange}
                required
                readOnly
                className="lowercase border border-gray-300 p-[6px_10px] w-full focus:border-gray-400  "
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="" required>
                Tình trạng
              </Label>
              <Select
                name="status"
                value={data.status}
                onChange={handleChange}
                required
                className="border border-gray-300 p-[6px_10px] w-full focus:border-gray-400  "
              >
                <option value="">Chọn tình trạng</option>
                <option value="ACTIVE">Bình thường</option>
                <option value="LOCKED">Bị chặn</option>
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="" required>
                Chức vụ
              </Label>
              <Select
                name="role"
                value={data.role}
                onChange={handleChange}
                required
                className="border border-gray-300 p-[6px_10px] w-full focus:border-gray-400"
              >
                <option value="">Chọn chức vụ</option>
                <option value="ADMIN">Quản trị viên</option>
                <option value="CUSTOMER">Khách hàng</option>
              </Select>
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="">Mật khẩu mới</Label>
              <Input
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                className="border border-gray-300 p-[6px_10px] w-full focus:border-gray-400  "
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6">
          <Button
            disabled={isLoadingUpdate}
            type="submit"
            className="p-[6px_10px] bg-success text-white font-medium text-center rounded-sm"
          >
            {isLoadingUpdate ? "Đang cập nhật..." : "Cập nhật"}
          </Button>
          <Link
            to="/admin/users"
            className="p-[6px_10px] bg-danger text-white text-[0.9rem] text-center rounded-sm"
          >
            Trờ về
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditUserForm;
