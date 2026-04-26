import { memo } from "react";
import Button from "../../../ui/Button";
import Image from "../../../ui/Image";
import { useLoginOAuth2 } from "../../../../hooks/queries/useAuth";
import { useGoogleLogin } from "@react-oauth/google";

const providers = [
  {
    label: "Google",
    img: "/assets/google.png",
  },
];

type Props = {
  title: string;
};

function SocialAuth({ title }: Props) {
  const { mutate: loginOAuth2 } = useLoginOAuth2();

  const loginGoogle = useGoogleLogin({
    onSuccess: (response) => {
      loginOAuth2({
        provider: "GOOGLE",
        accessToken: response.access_token,
      });
    },
  });

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
            onClick={() => loginGoogle()}
            className="w-full px-[12px] py-[8px] border border-gray-300 bg-white shadow-md rounded-md font-semibold"
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
