import type { UserResponse } from "../types/type";

export const mockUsers: UserResponse[] = [
  {
    userId: "u1",
    email: "user1@gmail.com",
    fullname: "Nguyễn Văn A",
    role: "CUSTOMER",
    status: "ACTIVE",
    createdAt: "2026-01-01",
    updatedAt: "2026-01-02",
  },
  {
    userId: "u2",
    email: "admin@gmail.com",
    fullname: "Trần Thị B",
    role: "ADMIN",
    status: "ACTIVE",
  },
];
