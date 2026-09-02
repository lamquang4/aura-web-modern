import Input from "../../ui/Input";
import Label from "../../ui/Label";
import { useGetMe, useUpdateUser } from "../../../hooks/queries/useUsers";
import {
  updateUserSchema,
  type UpdateUserData,
} from "../../../schemas/userSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import FieldError from "../../ui/FieldError";

function AccountInfo() {
  const { mutate: updateUser, isPending: isLoadingUpdate } = useUpdateUser();

  const { data: accountData } = useGetMe();
  const account = accountData?.data;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateUserData>({
    resolver: zodResolver(updateUserSchema),
    mode: "onBlur",
    values: {
      fullname: account?.fullname || "",
      password: "",
      role: account?.role || "",
      status: "ACTIVE",
    },
  });

  const onSubmit = (data: UpdateUserData) => {
    if (!account) return;

    updateUser({
      userId: account.userId,
      data: {
        fullname: data.fullname,
        password: "",
        role: account.role,
        status: "ACTIVE",
      },
    });
  };

  return (
    <div className="w-full flex-1 px-[15px] bg-white">
      <div className="space-y-[20px]">
        <h2>Thông tin tài khoản</h2>

        <form
          className="flex flex-col gap-[30px]"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-[15px]">
            <div className="space-y-[5px] w-full">
              <Label
                htmlFor=""
                className="block text-left text-[0.9rem] font-medium"
              >
                Họ tên:
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

            <div className="space-y-[5px] w-full">
              <Label
                htmlFor=""
                className="block text-left text-[0.9rem] font-medium"
              >
                Email:
              </Label>
              <Input
                type="text"
                name="email"
                className="w-full rounded-sm p-[6px_10px] text-[0.9rem] border border-neutral-200 focus:border-primary"
                value={account?.email}
                readOnly
              />
            </div>
          </div>

          <div className="flex justify-center gap-6">
            <Button
              disabled={isLoadingUpdate}
              type="submit"
              className="p-[8px_12px] hover-scale bg-info text-white font-medium text-center rounded-sm"
            >
              {isLoadingUpdate ? "Đang cập nhật..." : "Cập nhật"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AccountInfo;
