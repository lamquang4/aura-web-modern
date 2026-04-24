import type { SavedCardDetailResponse } from "../types/type";

export const mockSavedCardDetail: SavedCardDetailResponse = {
  savedCardId: "saved-001",
  customName: "Thiệp 20/10 tặng mẹ",
  customContent:
    "Chúc mừng ngày 20/10!\nChúc mẹ luôn xinh đẹp, hạnh phúc\nvà thành công trong cuộc sống.",
  fontFamily: "Dancing Script",
  fontWeight: "normal",
  fontStyle: "normal",
  fontColor: "#c0392b",
  card: {
    cardId: "card-001",
    frontImage: "/assets/thiep2010.webp",
    backImage: "",
  },
};
