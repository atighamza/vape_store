import { useForm, SubmitHandler } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorText from "./ErrorText";
import axiosInstance from "../../api/api";
import { AxiosResponse, AxiosError } from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { loginUser } from "../../redux/features/slices/authSlice";
import { getUserInfos } from "../../redux/features/slices/userSlice";

type FormData = {
  email: string;
  password: string;
};

const schema = yup
  .object({
    email: yup.string().email().required("email is required"),
    password: yup.string().min(3).required("password is required"),
  })
  .required();
const LoginForm = () => {
  const dispatch = useAppDispatch();
  const access_token = useAppSelector((state) => state.auth.access_token);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { email: "hamzaatig2000@gmail.com", password: "123" },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    /*try {
      const response = await axiosInstance.post("/auth/signin", data);
      console.log(response);
    } catch (error: any) {
      console.log(error.response.data.message);
    }*/
    await dispatch(loginUser(data));
    if (access_token) {
      dispatch(getUserInfos(access_token));
    }
  };

  return (
    <form className="flex flex-col gap-6 " onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder="ENTER YOUR EMAIL"
        name="email"
        register={register}
        errorMessage={errors.email?.message}
      />
      <Input
        placeholder="PASSWORD"
        name="password"
        register={register}
        errorMessage={errors.password?.message}
      />

      <p>
        If you don't have an account, please{" "}
        <span className="text-[#6aa1da] hover:text-[#c50000] hover:cursor-pointer ml-1">
          Register Here
        </span>
      </p>
      <Button text="LOGIN" />
    </form>
  );
};

export default LoginForm;
