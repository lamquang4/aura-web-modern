import { memo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Loading from "../../ui/Loading";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import Label from "../../ui/Label";
import { Eye, EyeOff, X } from "lucide-react";
import SocialAuth from "./SocialAuth";
import { useRegister } from "../../../hooks/queries/useAuth";
import Overplay from "../../ui/Overplay";
import { registerSchema, type RegisterData } from "../../../schemas/authSchema";
import FieldError from "../../ui/FieldError";

interface Props {
  onClose: () => void;
  onSwitchLogin: () => void;
}

function RegisterModal({ onClose, onSwitchLogin }: Props) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  const { mutate: registerUser, isPending: isLoading } = useRegister();

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (data: RegisterData) => {
    registerUser(
      {
        fullname: data.fullname.trim(),
        email: data.email.trim(),
        password: data.password.trim(),
      },
      {
        onSuccess: () => {
          reset();
        },
      },
    );
  };

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-99 flex items-center justify-center overflow-y-auto text-black">
        <div className="relative w-full max-w-md mx-auto pointer-events-auto">
          <div className="relative p-[25px_15px] bg-white space-y-[15px] rounded-lg">
            <div className="flex items-center justify-between">
              <h4 className="uppercase">Đăng ký</h4>

              <Button
                onClick={onClose}
                type="button"
                className="bg-transparent ms-auto"
              >
                <X size={24} strokeWidth={2} />
              </Button>
            </div>

            <hr className="border-neutral-200" />

            <form className="space-y-[15px]" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-[5px]">
                <Label htmlFor="" required>
                  Email
                </Label>
                <Input
                  type="text"
                  id="email"
                  className="text-[0.9rem] block w-full px-3 py-2 border border-neutral-200 focus:border-primary"
                  placeholder="Nhập email"
                  error={errors.email?.message}
                  {...register("email", {
                    onChange: (e) => {
                      e.target.value = e.target.value.toLowerCase();
                    },
                  })}
                />
                <FieldError message={errors.email?.message} />
              </div>

              <div className="space-y-[5px]">
                <Label htmlFor="" required>
                  Họ tên
                </Label>
                <Input
                  type="text"
                  id="fullname"
                  className="text-[0.9rem] block w-full px-3 py-2 border border-neutral-200 focus:border-primary"
                  placeholder="Nhập họ tên"
                  error={errors.fullname?.message}
                  {...register("fullname")}
                />
                <FieldError message={errors.fullname?.message} />
              </div>

              <div className="space-y-[5px]">
                <Label htmlFor="" required>
                  Mật khẩu
                </Label>

                <div className="relative">
                  <Input
                    type={!showPassword ? "password" : "text"}
                    id="password"
                    placeholder="Nhập mật khẩu"
                    className="text-[0.9rem] block w-full px-3 pr-12 py-2 border border-neutral-200 focus:border-primary"
                    error={errors.password?.message}
                    {...register("password")}
                  />

                  <Button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-300"
                    onClick={toggleShowPassword}
                  >
                    {!showPassword ? <Eye size={22} /> : <EyeOff size={22} />}
                  </Button>
                </div>
                <FieldError message={errors.password?.message} />
              </div>

              <Button
                disabled={isLoading}
                type="submit"
                className="w-full bg-primary text-white focus:outline-none font-semibold rounded-sm uppercase text-[0.9rem] px-5 py-2.5 text-center"
              >
                Đăng kí
              </Button>

              <p className="flex gap-1.5 justify-center font-medium">
                Bạn đã có tài khoản?
                <Button
                  type="button"
                  onClick={onSwitchLogin}
                  className="text-primary font-medium"
                >
                  Đăng nhập
                </Button>
              </p>
            </form>

            <SocialAuth title="đăng ký" onClose={onClose} />
          </div>
        </div>
      </div>

      {isLoading && (
        <Overplay className="z-99">
          <Loading height={0} size={55} color="white" thickness={8} />
          <h4 className="text-white">Vui lòng chờ trong giây lát...</h4>
        </Overplay>
      )}
    </>
  );
}

export default memo(RegisterModal);
