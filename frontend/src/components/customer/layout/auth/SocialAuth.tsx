import { memo } from "react";
import Button from "../../../ui/Button";
import Image from "../../../ui/Image";

type Props = {
  title: string;
};

function SocialAuth({ title }: Props) {
  const providers = [
    {
      label: "Google",
      img: "/assets/google.png",
    },
  ];
  return (
    <>
      <div className="flex items-center">
        <div className="flex-grow border-t border-gray-300" />
        <span className="px-[0.6rem] text-[0.9rem] text-black whitespace-nowrap">
          Hoặc {title} bằng
        </span>
        <div className="flex-grow border-t border-gray-300" />
      </div>

      <div className="grid grid-cols-auto gap-[10px]">
        {providers.map((provider, index) => (
          <Button
            key={index}
            type="button"
            className="w-full px-[12px] py-[8px] bg-[#DF4A32] rounded-md font-semibold text-white"
          >
            <div className="flex items-center justify-center gap-[10px]">
              <Image
                source={provider.img}
                alt=""
                className="w-[80px]"
                loading="eager"
              />
              <span>{provider.label}</span>
            </div>
          </Button>
        ))}
      </div>
    </>
  );
}

export default memo(SocialAuth);
