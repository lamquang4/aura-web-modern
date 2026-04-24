import { Link } from "react-router-dom";
import Image from "../../../ui/Image";

type Props = {
  title: string;
  bgColor: string;
  link: string;
  image: string;
};

function CollectionItem({ title, bgColor, link, image }: Props) {
  return (
    <div
      className={`space-y-[30px] overflow-hidden p-[20px] rounded-md`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="space-y-[15px]">
        <h4 className="uppercase">{title}</h4>

        <Link
          className="border border-black p-[6px_10px] text-[0.9rem] font-medium text-center inline-block w-fit hover:bg-black hover:text-white"
          to={link}
        >
          Xem thêm
        </Link>
      </div>

      <div className="flex justify-center relative items-center">
        <Image source={image} alt="" className="w-[230px]" loading="eager" />
      </div>
    </div>
  );
}

export default CollectionItem;
