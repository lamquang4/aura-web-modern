import { mockUsers } from "../../mocks/mockUsers";
import Input from "../ui/Input";
import Label from "../ui/Label";

function AccountInfo() {
  const account = mockUsers[0];
  return (
    <div className="py-[30px] sm:px-[25px] px-[15px] bg-[#F1F4F9] h-full">
      <form className="flex flex-col gap-7 w-full">
        <h2 className="text-neutral">Tài khoản</h2>

        <div className="gap-[25px] w-full flex flex-wrap lg:flex-nowrap">
          <div className="sm:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
            <h5 className="font-bold text-neutral">Thông tin tài khoản</h5>

            <div className="flex flex-col gap-1 w-full ">
              <Label htmlFor="" className="text-[0.9rem]  font-medium">
                Họ tên
              </Label>
              <Input
                type="text"
                name="fullname"
                value={account?.fullname}
                readOnly
                className="border border-gray-300 p-[6px_10px] w-full focus:border-gray-400  "
              />
            </div>

            <div className="flex flex-col gap-1 w-full ">
              <Label htmlFor="" className="text-[0.9rem]  font-medium">
                Email
              </Label>
              <Input
                type="text"
                name="email"
                value={account?.email}
                readOnly
                className="border border-gray-300 p-[6px_10px] w-full focus:border-gray-400  "
              />
            </div>

            <div className="flex flex-col gap-1 w-full ">
              <Label htmlFor="" className="text-[0.9rem]  font-medium">
                Chức vụ
              </Label>
              <Input
                type="text"
                name="role"
                value={account?.role === "ADMIN" ? "Quản trị viên" : ""}
                readOnly
                className="border border-gray-300 p-[6px_10px] w-full focus:border-gray-400  "
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AccountInfo;
