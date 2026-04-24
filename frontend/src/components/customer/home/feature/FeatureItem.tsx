import Image from "../../../ui/Image";

type Props = {
  image: string;
  title: string;
  desc: string;
};

function FeatureItem({ image, title, desc }: Props) {
  return (
    <div className="w-full p-[15px] bg-white border border-gray-300">
      <div className="mb-[30px]">
        <Image source={image} alt="" className="w-[45px]" loading="lazy" />
      </div>
      <div>
        <h4>{title}</h4>
        <p className="leading-[1.5rem]">{desc}</p>
      </div>
    </div>
  );
}

export default FeatureItem;
