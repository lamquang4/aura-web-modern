import { useGetMe } from "../../hooks/queries/useUsers";
import Input from "../ui/Input";
import Label from "../ui/Label";

function AccountInfo() {
  const { data: accountData } = useGetMe();
  const account = accountData?.data;
  return (
    <div className="py-[30px] sm:px-[25px] px-[15px] h-full">
      <form className="flex flex-col gap-7 w-full">
        <h2>Tài khoản</h2>

        <div className="gap-[25px] w-full flex flex-wrap lg:flex-nowrap">
          <div className="sm:p-[25px] p-[15px] bg-white rounded-md flex flex-col gap-[20px] w-full">
            <h5 className="font-bold">Thông tin tài khoản</h5>

            <div className="flex flex-col gap-1 w-full ">
              <Label htmlFor="fullname">Họ tên</Label>
              <Input
                id="fullname"
                type="text"
                name="fullname"
                value={account?.fullname ?? ""}
                readOnly
                className="border border-border p-[6px_10px] w-full focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-1 w-full ">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                name="email"
                value={account?.email ?? ""}
                readOnly
                className="border border-border p-[6px_10px] w-full focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor="role">Chức vụ</Label>
              <Input
                id="role"
                type="text"
                name="role"
                value={account?.role === "ADMIN" ? "Quản trị viên" : ""}
                readOnly
                className="border border-border p-[6px_10px] w-full focus:border-primary"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AccountInfo;
