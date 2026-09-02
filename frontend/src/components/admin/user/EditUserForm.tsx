import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import Input from "../../ui/Input";
import Select from "../../ui/Select";
import Button from "../../ui/Button";
import Label from "../../ui/Label";
import FieldError from "../../ui/FieldError";
import {
  useGetMe,
  useGetUserById,
  useUpdateUser,
} from "../../../hooks/queries/useUsers";
import {
  updateUserSchema,
  type UpdateUserData,
} from "../../../schemas/userSchema";

function EditUserForm() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: userData, isLoading } = useGetUserById(id ?? "");
  const { mutate: updateUser, isPending: isLoadingUpdate } = useUpdateUser();
  const user = userData?.data;

  const { data: accountData } = useGetMe();
  const account = accountData?.data;

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UpdateUserData>({
    resolver: zodResolver(updateUserSchema),
    mode: "onBlur",
    values: {
      fullname: user?.fullname || "",
      password: "",
      status: user?.status?.toString() || "",
      role: user?.role || "",
    },
  });

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      toast.error("Người dùng không tìm thấy");
      navigate("/admin/users");
      return;
    }
  }, [isLoading, user, navigate]);

  const onSubmit = (data: UpdateUserData) => {
    if (data.status === "LOCKED" && id === account?.userId) {
      toast.error("Bạn không thể tự khóa chính tài khoản của mình");
      return;
    }

    if (data.password && user?.provider === "GOOGLE") {
      toast.error("Tài khoản Google không thể đặt mật khẩu");
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
          reset((prev) => ({ ...prev, password: "" }));
        },
      },
    );
  };

  return (
    <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-full">
      <form
        className="flex flex-col gap-7 w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-neutral-300">Chỉnh sửa người dùng</h2>

        <div className="flex gap-[25px] w-full flex-col">
          <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
            <h5 className="font-bold text-neutral-300">Thông tin tài khoản</h5>

            <div className="flex flex-col gap-1">
              <Label htmlFor="fullname" required>
                Họ tên
              </Label>
              <Controller
                name="fullname"
                control={control}
                render={({ field }) => (
                  <Input
                    type="text"
                    id="fullname"
                    className="border border-neutral-200 p-[6px_10px] w-full focus:border-primary"
                    error={errors.fullname?.message}
                    {...field}
                  />
                )}
              />
              <FieldError message={errors.fullname?.message} />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="email" required>
                Email
              </Label>
              <Input
                type="email"
                id="email"
                value={user?.email ?? ""}
                readOnly
                className="lowercase border border-neutral-200 p-[6px_10px] w-full focus:border-primary cursor-not-allowed"
              />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="status" required>
                Tình trạng
              </Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Select
                    id="status"
                    className="border border-neutral-200 p-[6px_10px] w-full focus:border-primary"
                    error={errors.status?.message}
                    {...field}
                  >
                    <option value="">Chọn tình trạng</option>
                    <option value="ACTIVE">Bình thường</option>
                    <option value="LOCKED">Bị chặn</option>
                  </Select>
                )}
              />
              <FieldError message={errors.status?.message} />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="role" required>
                Chức vụ
              </Label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <Select
                    id="role"
                    className="border border-neutral-200 p-[6px_10px] w-full focus:border-primary"
                    error={errors.role?.message}
                    {...field}
                  >
                    <option value="">Chọn chức vụ</option>
                    <option value="ADMIN">Quản trị viên</option>
                    <option value="CUSTOMER">Khách hàng</option>
                  </Select>
                )}
              />
              <FieldError message={errors.role?.message} />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="password">Mật khẩu mới</Label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    type="password"
                    id="password"
                    className="border border-neutral-200 p-[6px_10px] w-full focus:border-primary"
                    error={errors.password?.message}
                    {...field}
                  />
                )}
              />
              <FieldError message={errors.password?.message} />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6">
          <Button
            disabled={isLoadingUpdate}
            type="submit"
            className="p-[6px_10px] hover-scale bg-success text-white font-medium text-center rounded-sm"
          >
            {isLoadingUpdate ? "Đang cập nhật..." : "Cập nhật"}
          </Button>
          <Link
            to="/admin/users"
            className="p-[6px_10px] hover-scale bg-danger text-white text-[0.9rem] text-center rounded-sm"
          >
            Trở về
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditUserForm;
