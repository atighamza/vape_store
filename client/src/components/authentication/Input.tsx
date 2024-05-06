import React, { forwardRef } from "react";
import { FormData } from "./LoginForm";

interface InputProps {
  name: string;
  placeholder: string;
  type?: string;
  errorMessage?: string | undefined;
  register: any;
}

const Input = ({
  name,
  placeholder,
  type,
  errorMessage,
  register,
}: InputProps) => {
  return (
    <>
      <input
        placeholder={placeholder}
        {...register(name)}
        type={type}
        required
        className={`p-4 border border-slate-200 rounded-lg hover:border-[#c50000] ${
          errorMessage && "border-red-400"
        }`}
      />
      {errorMessage && (
        <p className="my-2 text-red-600 text-lg">{errorMessage}</p>
      )}
    </>
  );
};

export default Input;
