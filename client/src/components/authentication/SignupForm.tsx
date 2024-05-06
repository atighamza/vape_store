import { useForm, SubmitHandler } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ErrorText from "./ErrorText";
import axiosInstance from "../../api/api";
import { AxiosResponse, AxiosError } from "axios";

type FormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

const schema = yup
  .object({
    email: yup.string().email().required("email is required"),
    password: yup.string().min(3).required("password is required"),
    firstName: yup.string().required("first name required"),
    lastName: yup.string().required("last name required"),
  })
  .required();
const SignupForm = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(schema) });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await axiosInstance.post("/user/create", data);
      console.log(response);
    } catch (error: any) {
      console.log(error.response.data.message);
    }
  };
  return (
    <form className="flex flex-col gap-6 " onSubmit={handleSubmit(onSubmit)}>
      <Input
        placeholder="FIRST NAME"
        name="firstName"
        register={register}
        errorMessage={errors.firstName?.message}
      />
      <Input
        placeholder="lAST NAME"
        name="lastName"
        register={register}
        errorMessage={errors.lastName?.message}
      />
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
        If you have an account, please
        <span className="text-[#6aa1da] hover:text-[#c50000] hover:cursor-pointer ml-1">
          Login Here
        </span>
      </p>
      <Button text="LOGIN" />
    </form>
  );
};

export default SignupForm;
