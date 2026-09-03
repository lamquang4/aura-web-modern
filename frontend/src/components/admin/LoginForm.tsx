import Image from "../ui/Image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Loading from "../ui/Loading";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Label from "../ui/Label";
import { Eye, EyeOff } from "lucide-react";
import { useLogin } from "../../hooks/queries/useAuth";
import Overplay from "../ui/Overplay";
import { loginSchema, type LoginData } from "../../schemas/authSchema";
import FieldError from "../ui/FieldError";
function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: login, isPending: isLoading } = useLogin();

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (data: LoginData) => {
    login(
      {
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
      <section className="bg-[#F1F4F9] w-full">
        <div className="flex justify-center items-center h-screen">
          <div className="relative bg-white rounded-lg shadow-md border border-border max-w-[850px] w-full h-[500px]">
            <div className="h-full grid grid-cols-1 sm:grid-cols-2 items-center">
              <div className="w-full px-4 sm:px-8 bg-white">
                <h1 className="relative text-center uppercase mb-6">
                  Đăng nhập
                </h1>

                <form
                  className="space-y-[15px]"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="space-y-[5px]">
                    <Label htmlFor="email" required>
                      Email
                    </Label>
                    <Input
                      type="text"
                      id="email"
                      className="text-[0.9rem] block w-full px-3 py-2 border border-border focus:border-primary"
                      placeholder="Nhập email"
                      error={errors.email?.message}
                      {...register("email")}
                    />
                    <FieldError message={errors.email?.message} />
                  </div>

                  <div className="space-y-[5px]">
                    <Label htmlFor="password" required>
                      Mật khẩu
                    </Label>

                    <div className="relative">
                      <Input
                        type={!showPassword ? "password" : "text"}
                        id="password"
                        placeholder="Nhập mật khẩu"
                        className="text-[0.9rem] block w-full px-3 pr-12 py-2 border border-border focus:border-primary"
                        error={errors.password?.message}
                        {...register("password")}
                      />

                      <Button
                        type="button"
                        className="absolute hover-scale right-3 top-1/2 -translate-y-1/2"
                        onClick={toggleShowPassword}
                      >
                        {!showPassword ? (
                          <Eye size={22} className="text-text-muted" />
                        ) : (
                          <EyeOff size={22} className="text-text-muted" />
                        )}
                      </Button>
                    </div>

                    <FieldError message={errors.password?.message} />
                  </div>

                  <Button
                    disabled={isLoading}
                    type="submit"
                    className="w-full bg-primary text-[0.9rem] text-white focus:outline-none font-semibold rounded-sm px-5 py-2.5 text-center mt-6"
                  >
                    Đăng nhập
                  </Button>
                </form>
              </div>

              <div className="hidden sm:block border-l-2 border-border">
                <Image
                  src={"/assets/hero1.png"}
                  alt={"hero"}
                  className={"w-full h-full object-cover"}
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {isLoading && (
        <Overplay className="xl:hidden">
          <Loading height={0} size={55} color="white" thickness={8} />
          <h4 className="text-white">Vui lòng chờ trong giây lát ...</h4>
        </Overplay>
      )}
    </>
  );
}

export default LoginForm;
