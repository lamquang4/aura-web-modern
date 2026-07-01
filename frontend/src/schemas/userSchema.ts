import { z } from "zod";

export const createUserSchema = z.object({
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
  role: z
    .string()
    .min(1, "Role không để trống")
    .refine((v) => ["CUSTOMER", "ADMIN"].includes(v), {
      message: "Role không hợp lệ",
    }),
  status: z
    .string()
    .min(1, "Tình trạng không để trống")
    .refine((v) => ["ACTIVE", "LOCKED"].includes(v), {
      message: "Tình trạng không hợp lệ",
    }),
});

export type CreateUserData = z.infer<typeof createUserSchema>;

export const updateUserSchema = z.object({
  fullname: z.string().trim().min(1, "Họ tên không để trống"),
  status: z
    .string()
    .min(1, "Tình trạng không để trống")
    .refine((v) => ["ACTIVE", "LOCKED"].includes(v), {
      message: "Tình trạng không hợp lệ",
    }),
  role: z
    .string()
    .min(1, "Chức vụ không để trống")
    .refine((v) => ["ADMIN", "CUSTOMER"].includes(v), {
      message: "Chức vụ không hợp lệ",
    }),
  password: z
    .string()
    .trim()
    .refine((v) => v === "" || v.length >= 6, {
      message: "Mật khẩu phải có ít nhất 6 ký tự",
    }),
});

export type UpdateUserData = z.infer<typeof updateUserSchema>;
