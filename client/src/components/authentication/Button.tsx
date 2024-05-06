import React from "react";

interface ButtonProps {
  text: string;
}

const Button = ({ text }: ButtonProps) => {
  return (
    <button className="py-5 bg-[#2d2d2d] text-white hover:bg-[#c50000]   rounded-lg ease-in duration-300">
      {text}
    </button>
  );
};

export default Button;
