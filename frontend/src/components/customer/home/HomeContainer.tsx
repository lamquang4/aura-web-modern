import BannerCarousel from "./BannerCarousel";
import FeatureSection from "./feature/FeatureSection";
import CardSlider from "../card/CardSlider";
import CollectionSection from "./collection/CollectionSection";
import ScrollReveal from "../ui/ScrollReveal";
import { useGetActiveCards } from "../../../hooks/queries/useCards";

function HomeContainer() {
  const { data, isLoading } = useGetActiveCards({ page: 1, limit: 12 });
  const cards = data?.data ?? [];
  return (
    <>
      <BannerCarousel />

      <ScrollReveal>
        <CollectionSection />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <CardSlider title="Thiệp nổi bật" cards={cards} isLoading={isLoading} />
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <FeatureSection />
      </ScrollReveal>
    </>
  );
}

export default HomeContainer;
