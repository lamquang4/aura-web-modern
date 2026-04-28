import SideBar from "../ui/SideBar";
import AccountInfo from "./AccountInfo";

function AccountContainer() {
  return (
    <>
      <section className="my-[40px]">
        <div className="w-full max-w-[1200px] mx-auto">
          <div className="flex justify-center flex-wrap gap-5">
            <SideBar />

            <AccountInfo />
          </div>
        </div>
      </section>
    </>
  );
}

export default AccountContainer;
