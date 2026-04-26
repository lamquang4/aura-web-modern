import { useEffect, useState } from "react";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import Label from "../../ui/Label";
import { useGetMe, useUpdateUser } from "../../../hooks/queries/useUsers";
import toast from "react-hot-toast";

function AccountForm() {
  const [data, setData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const { data: accountData } = useGetMe();
  const account = accountData?.data;

  const { mutate: updateUser, isPending: isLoadingUpdate } = useUpdateUser();

  useEffect(() => {
    if (account) {
      setData({
        fullname: account.fullname || "",
        email: account.email || "",
        password: "",
      });
    }
  }, [account]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: name === "gender" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (data.password.trim() && account?.provider === "GOOGLE") {
      toast.error("Tài khoản Google không thể đặt mật khẩu");
      return;
    }

    updateUser(
      {
        userId: account?.userId ?? "",
        data: {
          ...data,
          role: "CUSTOMER",
          status: "ACTIVE",
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
    <div className="w-full flex-1 px-[15px] bg-white">
      <div className="space-y-[20px]">
        <h2>Thông tin tài khoản</h2>

        <form className="flex flex-col gap-[15px]" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-[15px]">
            <div className="space-y-[5px] w-full">
              <Label
                htmlFor=""
                className="block text-left text-[0.9rem] font-medium"
              >
                Họ tên:
              </Label>
              <Input
                type="text"
                name="fullname"
                className="w-full rounded-sm p-[6px_10px] text-[0.9rem] border border-gray-300  focus:outline-0"
                value={data?.fullname}
                onChange={handleChange}
              />
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
                className="w-full rounded-sm p-[6px_10px] text-[0.9rem] border border-gray-300  focus:outline-0"
                value={data?.email}
                readOnly
              />
            </div>

            <div className="space-y-[5px] w-full">
              <Label htmlFor="" className="text-[0.9rem] font-medium">
                Mật khẩu mới
              </Label>
              <Input
             disabled={account?.provider === "GOOGLE"}
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                className="w-full rounded-sm p-[6px_10px] text-[0.9rem] border border-gray-300  focus:outline-0"
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              disabled={isLoadingUpdate}
              type="submit"
              className="p-[6px_10px] bg-primary text-white text-[0.9rem] font-medium text-center rounded-sm"
            >
              Lưu thay đổi
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AccountForm;
