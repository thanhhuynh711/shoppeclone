import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { schema, Schema } from "../../utils/rules";
import { useMutation } from "@tanstack/react-query";
import { omit } from "lodash";
import Input from "../../components/Input";
import { yupResolver } from "@hookform/resolvers/yup";
import authApi from "../../apis/auth.api";
import { isAxiosUnprocessableEntityError } from "../../utils/utils";
import { ErrorResponse } from "../../types/utils.type";
import { useContext } from "react";
import { AppContext } from "../../contexts/app.context";
import Button from "../../components/Button";

type FromData = Schema;

export default function Register() {
  const { setIsAuthenticated,setProfile } = useContext(AppContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<FromData>({
    resolver: yupResolver(schema),
  });

  const registerAccountMutation = useMutation({
    mutationFn: (body: Omit<FromData, "confirm_password">) =>
    authApi.registerAccount(body),
  });

  const onSubmit = handleSubmit((data) => {
    const body = omit(data, ["confirm_password"]);
    registerAccountMutation.mutate(body, {
      onSuccess: (data) => {
        setIsAuthenticated(true);
        setProfile(data.data.data.user)
        navigate("/");
      },
      onError: (error) => {
        console.log(error);
        if (
          isAxiosUnprocessableEntityError<
            ErrorResponse<Omit<FromData, "confirm_password">>
          >(error)
        ) {
          const fromError = error.response?.data.data;
          if (fromError) {
            Object.keys(fromError).forEach((key) => {
              setError(key as keyof Omit<FromData, "confirm_password">, {
                message:
                  fromError[key as keyof Omit<FromData, "confirm_password">],
                type: "Server",
              });
            });
          }
        }
      },
    });
  });

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
              <div className="text-2xl">Đăng ký</div>
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
              <Input
                name="confirm_password"
                register={register}
                type="password"
                className="mt-2"
                autoComplete="on"
                errorMessage={errors.confirm_password?.message}
                placeholder="Confirm Password"
              />

              <div className="mt-2">
                <Button
                  type="submit"
                  className="flex justify-center items-center w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600"
                  isLoading={registerAccountMutation.isLoading}
                  disabled={registerAccountMutation.isLoading}
                >
                  Đăng ký
                </Button>
              </div>
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center">
                  <span className="text-gray-400">Bạn đã có tài khoản?</span>
                  <Link className="text-red-400 ml-1" to="/login">
                    Đăng nhập
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
