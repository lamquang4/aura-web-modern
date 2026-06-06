import { Link } from "react-router-dom";
import Image from "../../ui/Image";

const cardSections = [
  {
    title: "Thiệp Sinh Nhật",
    bgColor: "#f4e2d5",
    link: "/cards",
    image: "/assets/thiepsn.webp",
  },
  {
    title: "Thiệp Tết",
    bgColor: "#ffece9",
    link: "/cards",
    image: "/assets/thieptet.webp",
  },
];

function CollectionSection() {
  return (
    <section className="mb-[40px] px-[15px]">
      <div className="mx-auto max-w-[1200px] w-full">
        <h2 className="mb-[20px]">Bộ sưu tập</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[30px]">
          {cardSections.map((card, index) => {
            return (
              <div
                key={index}
                className={`space-y-[30px] overflow-hidden p-[20px] rounded-md`}
                style={{ backgroundColor: card.bgColor }}
              >
                <div className="space-y-[15px]">
                  <h4 className="uppercase">{card.title}</h4>

                  <Link
                    className="border border-black p-[6px_10px] text-[0.9rem] font-medium text-center inline-block w-fit hover:bg-black hover:text-white"
                    to={card.link}
                  >
                    Xem thêm
                  </Link>
                </div>

                <div className="flex justify-center relative items-center">
                  <Image
                    src={card.image}
                    alt=""
                    className="w-[230px]"
                    loading="eager"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CollectionSection;
