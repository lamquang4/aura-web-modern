import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router-dom";
import Image from "../../ui/Image";
import { motion } from "framer-motion";

const banners = [
  {
    title: "Gửi gắm lời yêu thương qua những tấm thiệp dành tặng người thân",
    image: "/assets/thiep2010.webp",
    bg: "/assets/bg1.webp",
  },
  {
    title: "Gửi gắm lời yêu thương qua những tấm thiệp dành tặng người thân",
    image: "/assets/thiep2011.webp",
    bg: "/assets/bg1.webp",
  },
  {
    title: "Gửi gắm lời yêu thương qua những tấm thiệp dành tặng người thân",
    image: "/assets/thieptet.webp",
    bg: "/assets/bg1.webp",
  },
];

function BannerCarousel() {
  return (
    <section className="mb-[40px]">
      <div className="w-full mx-auto">
        <Swiper
          modules={[Autoplay, Pagination]}
          pagination={{ clickable: true }}
          autoplay={{ delay: 8000 }}
          loop
          speed={1000}
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-full py-14"
                style={{
                  backgroundImage: `url(${banner.bg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="max-w-[1200px] mx-auto px-[15px]">
                  <div className="w-full grid md:grid-cols-2 items-center text-center md:text-left gap-8">
                    <motion.div
                      initial={{ opacity: 0, x: -40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="space-y-6 max-w-[500px] mx-auto md:mx-0"
                    >
                      <h2 className="leading-tight">{banner.title}</h2>

                      <Link
                        to="/"
                        className="relative inline-flex items-center justify-center h-[45px] w-[120px] text-[0.9rem] font-semibold border border-black text-black overflow-hidden transition-colors duration-500 hover:text-white mx-auto md:mx-0 group"
                      >
                        <span className="relative z-10 flex items-center justify-center h-full">
                          Bắt đầu
                        </span>

                        <span className="absolute w-[200%] h-[200%] bg-black rounded-full top-full left-full transition-all duration-500 group-hover:top-[-50%] group-hover:left-[-50%] z-0" />
                      </Link>
                    </motion.div>

                    <motion.div
                      drag
                      dragConstraints={{
                        top: -20,
                        bottom: 20,
                        left: -30,
                        right: 30,
                      }}
                      dragElastic={0.2}
                      dragSnapToOrigin
                      className="cursor-grab active:cursor-grabbing flex justify-center md:justify-end"
                    >
                      <Image
                        source={banner.image}
                        alt="banner"
                        className="w-full sm:max-w-[330px] max-w-[280px]"
                        loading="eager"
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default BannerCarousel;
