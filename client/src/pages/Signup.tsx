import React from "react";
import SignupForm from "../components/authentication/SignupForm";

const Signup = () => {
  return (
    <div className=" w-screen">
      <div className="w-[50%] m-auto">
        <div>
          <div>
            <h3 className="text-3xl font-bold my-10">CREATE YOUR ACCOUNT</h3>
          </div>
          <SignupForm />
        </div>
      </div>
    </div>
  );
};

export default Signup;
