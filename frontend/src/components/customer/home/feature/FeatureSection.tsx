import FeatureItem from "./FeatureItem";

const features = [
  {
    image: "/assets/globe.png",
    title: "Thân thiện với môi trường",
    desc: "Sử dụng thiệp điện tử giúp giảm lượng giấy sử dụng, góp phần bảo vệ môi trường.",
  },
  {
    image: "/assets/piggy-bank.png",
    title: "Tiết kiệm chi phí",
    desc: "Thiệp điện tử không tốn tiền in ấn, vận chuyển hay mua sắm giấy.",
  },
  {
    image: "/assets/save-time.png",
    title: "Tiết kiệm thời gian",
    desc: "Thiệp điện tử có thể được gửi đi chỉ trong vài giây qua email, mạng xã hội.",
  },
  {
    image: "/assets/setting.png",
    title: "Dễ dàng tùy chỉnh",
    desc: "Thiệp điện tử có thể dễ dàng tùy chỉnh màu sắc, hình ảnh, và phong cách khác nhau theo ý muốn.",
  },
];

function FeatureSection() {
  return (
    <section className="mb-[40px] px-[15px]">
      <div className="mx-auto max-w-[1200px] w-full">
        <h2 className="mb-[20px]">Chức năng</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[15px] mx-auto w-full">
          {features.map((item, index) => {
            return (
              <FeatureItem
                key={index}
                image={item.image}
                desc={item.desc}
                title={item.title}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;
