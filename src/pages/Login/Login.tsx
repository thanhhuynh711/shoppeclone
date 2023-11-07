import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema, Schema } from "../../utils/rules";
import Input from "../../components/Input";
import authApi from "../../apis/auth.api";
import { isAxiosUnprocessableEntityError } from "../../utils/utils";
import { ErrorResponse } from "../../types/utils.type";
import { useContext } from "react";
import { AppContext } from "../../contexts/app.context";
import Button from "../../components/Button";

type FromData = Omit<Schema, "confirm_password">;
const loginSchma =schema.omit(["confirm_password"])

export default function Login() {
  const {setIsAuthenticated, setProfile} = useContext(AppContext)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<FromData>({
    resolver: yupResolver(loginSchma),
  });

  const loginMutation = useMutation({
    mutationFn: (body: Omit<FromData, "confirm_password">) => authApi.login(body),
  });

  const onSubmit = handleSubmit((data) => {
    loginMutation.mutate(data, {
      onSuccess: (data) => {
        setIsAuthenticated(true)
        setProfile(data.data.data.user)
        navigate("/")
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ErrorResponse<FromData>>(error)) {
          const fromError = error.response?.data.data;
          if (fromError) {
            Object.keys(fromError).forEach((key) => {
              setError(key as keyof FromData, {
                message: fromError[key as keyof FromData],
                type: "Server",
              });
            });
          }
        }
      },
    });
  });

  const value = watch()
  console.log(value, errors);
  

  return (
    <div className="bg-orange">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10">
          <div className="lg:col-span-2 lg:col-start-4">
            <form
              onSubmit={onSubmit}
              noValidate
              className="p-10 rounded bg-white shadow-sm"
            >
              <div className="text-2xl">Đăng nhập</div>
              <Input
                name="email"
                register={register}
                type="email"
                className="mt-8"
                errorMessage={errors.email?.message}
                placeholder="Email"
              />
              <Input
                name="password"
                register={register}
                type="password"
                className="mt-2"
                autoComplete="on"
                errorMessage={errors.password?.message}
                placeholder="Password"
              />
              <div className="mt-3">
                <Button
                  type="submit"
                  className=" flex justify-center items-center w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600"
                  isLoading={loginMutation.isLoading}
                  disabled={loginMutation.isLoading}
                >
                  Đăng nhập
                </Button>
              </div>
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center">
                  <span className="text-gray-400">
                    Bạn mới biết đến Shopee?
                  </span>
                  <Link className="text-red-400 ml-1" to="/register">
                    Đăng ký
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
