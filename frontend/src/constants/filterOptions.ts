export const COMMON_ALL_OPTION = {
  name: "Tất cả",
  value: null,
};

export const USER_STATUS_OPTIONS = [
  COMMON_ALL_OPTION,
  { name: "Bình thường", value: "ACTIVE" },
  { name: "Bị khóa", value: "LOCKED" },
];

export const CARD_STATUS_OPTIONS = [
  COMMON_ALL_OPTION,
  {
    name: "Hiện",
    value: "ACTIVE",
  },
  {
    name: "Ẩn",
    value: "INACTIVE",
  },
];
