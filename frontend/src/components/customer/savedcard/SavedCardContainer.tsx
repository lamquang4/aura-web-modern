import SideBar from "../ui/SideBar";
import SavedCardList from "./SavedCardList";

function SavedCardContainer() {
  return (
    <section className="my-[40px]">
      <div className="w-full max-w-[1200px] mx-auto">
        <div className="flex justify-center flex-wrap gap-5">
          <SideBar />

          <SavedCardList />
        </div>
      </div>
    </section>
  );
}

export default SavedCardContainer;
