import type { SavedCardListItemResponse } from "../types/type";

export const mockSavedCardList: SavedCardListItemResponse[] = [
  {
    savedCardId: "saved_001",
    customName: "Thiệp 20/11 tri ân thầy cô",
    createdAt: "2024-12-01T08:30:00.000Z",
    card: {
      cardId: "p1",
      frontImage: "/assets/thiep2011.webp",
    },
  },
  {
    savedCardId: "saved_002",
    customName: "Thiệp Giáng sinh Merry Christmas",
    createdAt: "2024-12-05T10:15:00.000Z",
    card: {
      cardId: "p2",
      frontImage: "/assets/thiepgs.webp",
    },
  },
  {
    savedCardId: "saved_003",
    customName: "Thiệp Halloween spooky",
    createdAt: "2024-12-10T14:00:00.000Z",
    card: {
      cardId: "p3",
      frontImage: "/assets/thiephalloween2.webp",
    },
  },
  {
    savedCardId: "saved_004",
    customName: "Thiệp sinh nhật dễ thương",
    createdAt: "2024-12-15T09:00:00.000Z",
    card: {
      cardId: "p4",
      frontImage: "/assets/thiepsn.webp",
    },
  },
  {
    savedCardId: "saved_005",
    customName: "Thiệp Tết chúc mừng năm mới",
    createdAt: "2024-12-20T11:30:00.000Z",
    card: {
      cardId: "p5",
      frontImage: "/assets/thieptet.webp",
    },
  },
  {
    savedCardId: "saved_006",
    customName: "Thiệp Valentine đáng yêu",
    createdAt: "2024-12-25T13:45:00.000Z",
    card: {
      cardId: "p6",
      frontImage: "/assets/thiepvalentine.webp",
    },
  },
];
