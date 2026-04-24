import { Link } from "react-router-dom";
import Image from "../../ui/Image";

type Props = {
  mobile: string;
  desktop: string;
};

function PromotionBanner({ mobile, desktop }: Props) {
  return (
    <section className="mb-[40px]">
      <div className="mx-auto max-w-[1200px] w-full">
        <div className="grid grid-cols-1">
          <Link to="/cards/all">
            <div className="relative w-full">
              <picture>
                <source srcSet={mobile} media="(max-width: 768px)" />
                <Image
                  source={desktop}
                  alt="banner"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </picture>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default PromotionBanner;
