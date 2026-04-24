import CollectionItem from "./CollectionItem";

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
              <CollectionItem
                key={index}
                title={card.title}
                bgColor={card.bgColor}
                link={card.link}
                image={card.image}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default CollectionSection;
