import { z } from "zod";
import { MAX_CONTENT_LENGTH } from "../constants/limit";

const savedCardBase = {
  customName: z.string().trim().min(1, "Tên thiệp không để trống"),
  customContent: z
    .string()
    .trim()
    .min(1, "Nội dung không để trống")
    .max(MAX_CONTENT_LENGTH, `Nội dung không được vượt quá ${MAX_CONTENT_LENGTH} ký tự`),
  fontFamily: z.string().trim().min(1, "Font family không để trống"),
  fontWeight: z.string().trim().min(1, "Font weight không để trống"),
  fontStyle: z.string().trim().min(1, "Font style không để trống"),
  fontColor: z.string().trim().min(1, "Font color không để trống"),
  cardId: z.string().trim().min(1, "ID thiệp không để trống"),
};

export const savedCardSchema = z.object(savedCardBase);

export type SavedCardData = z.infer<typeof savedCardSchema>;
