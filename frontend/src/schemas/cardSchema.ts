import { z } from "zod";

export const createCardSchema = z.object({
  name: z.string().trim().min(1, "Tên thiệp không để trống"),
  content: z
    .string()
    .trim()
    .min(1, "Nội dung không để trống")
    .max(200, "Nội dung không được vượt quá 200 ký tự"),
  status: z
    .string()
    .min(1, "Tình trạng không để trống")
    .refine((v) => ["ACTIVE", "INACTIVE"].includes(v), {
      message: "Tình trạng không hợp lệ",
    }),
});

export type CreateCardData = z.infer<typeof createCardSchema>;

export const updateCardSchema = z.object({
  name: z.string().trim().min(1, "Tên card không để trống"),
  content: z
    .string()
    .trim()
    .min(1, "Nội dung không để trống")
    .max(200, "Nội dung không được vượt quá 200 ký tự"),
  status: z
    .string()
    .min(1, "Tình trạng không để trống")
    .refine((v) => ["ACTIVE", "INACTIVE"].includes(v), {
      message: "Tình trạng không hợp lệ",
    }),
});

export type UpdateCardData = z.infer<typeof updateCardSchema>;
