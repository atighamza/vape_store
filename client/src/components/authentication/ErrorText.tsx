import React from "react";

interface ErrorTextProps {
  errorMessage: string;
}

const ErrorText = ({ errorMessage }: ErrorTextProps) => {
  return <p className="my-2 text-red-600 text-lg">{errorMessage}</p>;
};

export default ErrorText;
