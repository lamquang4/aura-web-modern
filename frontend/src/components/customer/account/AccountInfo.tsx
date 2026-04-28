import { useEffect, useState } from "react";
import Input from "../../ui/Input";
import Label from "../../ui/Label";
import { useGetMe } from "../../../hooks/queries/useUsers";

function AccountInfo() {
  const [data, setData] = useState({
    fullname: "",
    email: "",
  });

  const { data: accountData } = useGetMe();
  const account = accountData?.data;

  useEffect(() => {
    if (account) {
      setData({
        fullname: account.fullname || "",
        email: account.email || "",
      });
    }
  }, [account]);

  return (
    <div className="w-full flex-1 px-[15px] bg-white">
      <div className="space-y-[20px]">
        <h2>Thông tin tài khoản</h2>

        <form className="flex flex-col gap-[15px]">
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
                readOnly
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default AccountInfo;
