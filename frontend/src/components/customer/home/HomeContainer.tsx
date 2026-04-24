import BannerCarousel from "./BannerCarousel";
import FeatureSection from "./feature/FeatureSection";
import CardSlider from "../card/CardSlider";
import { mockCardList } from "../../../mocks/mockCardLists";
import CollectionSection from "./collection/CollectionSection";
import ScrollReveal from "../ui/ScrollReveal";

function HomeContainer() {
  const cards = mockCardList;
  return (
    <>
      <BannerCarousel />

      <ScrollReveal>
        <CollectionSection />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <CardSlider title="Thiệp nổi bật" cards={cards} />
      </ScrollReveal>

      <ScrollReveal delay={0.2}>
        <FeatureSection />
      </ScrollReveal>
    </>
  );
}

export default HomeContainer;
