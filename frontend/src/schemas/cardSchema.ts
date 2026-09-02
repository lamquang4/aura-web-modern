import { z } from "zod";
import { MAX_CONTENT_LENGTH } from "../constants/limit";

export const createCardSchema = z.object({
  name: z.string().trim().min(1, "Tên thiệp không để trống"),
  content: z
    .string()
    .trim()
    .min(1, "Nội dung không để trống")
    .max(
      MAX_CONTENT_LENGTH,
      `Nội dung không được vượt quá ${MAX_CONTENT_LENGTH} ký tự`,
    ),
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
    .max(
      MAX_CONTENT_LENGTH,
      `Nội dung không được vượt quá ${MAX_CONTENT_LENGTH} ký tự`,
    ),
  status: z
    .string()
    .min(1, "Tình trạng không để trống")
    .refine((v) => ["ACTIVE", "INACTIVE"].includes(v), {
      message: "Tình trạng không hợp lệ",
    }),
});

export type UpdateCardData = z.infer<typeof updateCardSchema>;
