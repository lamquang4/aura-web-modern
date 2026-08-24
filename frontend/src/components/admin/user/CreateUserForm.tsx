import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Label from "../../ui/Label";
import Select from "../../ui/Select";
import { useCreateUser } from "../../../hooks/queries/useUsers";
import {
  createUserSchema,
  type CreateUserData,
} from "../../../schemas/userSchema";
import FieldError from "../../ui/FieldError";

function CreateUserForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserData>({
    resolver: zodResolver(createUserSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      fullname: "",
      password: "",
      status: "",
      role: "",
    },
  });

  const { mutate: createUser, isPending: isLoading } = useCreateUser();

  const onSubmit = (data: CreateUserData) => {
    createUser(
      {
        email: data.email,
        fullname: data.fullname,
        password: data.password,
        role: data.role as "CUSTOMER" | "ADMIN",
        status: data.status as "ACTIVE" | "LOCKED",
      },
      {
        onSuccess: () => {
          reset();
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
        <h2 className="text-neutral-300">Thêm người dùng</h2>

        <div className="flex gap-[25px] w-full flex-col">
          <div className="md:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
            <h5 className="font-bold text-neutral-300">Thông tin tài khoản</h5>

            <div className="flex flex-col gap-1">
              <Label htmlFor="fullname" required>
                Họ tên
              </Label>
              <Input
                type="text"
                id="fullname"
                className="border border-neutral-200 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-primary"
                error={errors.fullname?.message}
                {...register("fullname")}
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
                className="lowercase border border-neutral-200 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-primary"
                error={errors.email?.message}
                {...register("email")}
              />
              <FieldError message={errors.email?.message} />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="status" required>
                Tình trạng
              </Label>
              <Select
                id="status"
                className="border border-neutral-200 p-[6px_10px] w-full focus:border-primary"
                error={errors.status?.message}
                {...register("status")}
              >
                <option value="">Chọn tình trạng</option>
                <option value="ACTIVE">Bình thường</option>
                <option value="LOCKED">Bị chặn</option>
              </Select>
              <FieldError message={errors.status?.message} />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="role" required>
                Chức vụ
              </Label>
              <Select
                id="role"
                className="border border-neutral-200 p-[6px_10px] w-full focus:border-primary"
                error={errors.role?.message}
                {...register("role")}
              >
                <option value="">Chọn chức vụ</option>
                <option value="ADMIN">Quản trị viên</option>
                <option value="CUSTOMER">Khách hàng</option>
              </Select>
              <FieldError message={errors.role?.message} />
            </div>

            <div className="flex flex-col gap-1">
              <Label htmlFor="password" required>
                Mật khẩu
              </Label>
              <Input
                type="password"
                id="password"
                className="border border-neutral-200 p-[6px_10px] text-[0.9rem] w-full outline-none focus:border-primary"
                error={errors.password?.message}
                {...register("password")}
              />
              <FieldError message={errors.password?.message} />
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-6">
          <Button
            disabled={isLoading}
            type="submit"
            className="p-[6px_10px] hover-scale bg-success text-white font-medium text-center rounded-sm"
          >
            {isLoading ? "Đang thêm..." : "Thêm"}
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

export default CreateUserForm;
