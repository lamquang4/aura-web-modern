import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email không để trống")
    .email("Email không hợp lệ"),
  password: z.string().min(1, "Mật khẩu không để trống"),
});

export type LoginData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email không để trống")
    .email("Email không hợp lệ"),
  fullname: z.string().trim().min(1, "Họ tên không để trống"),
  password: z
    .string()
    .min(1, "Mật khẩu không để trống")
    .min(6, "Mật khẩu tối thiểu 6 ký tự"),
});

export type RegisterData = z.infer<typeof registerSchema>;
