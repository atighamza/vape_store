import LoginForm from "../components/authentication/LoginForm";

const Login = () => {
  return (
    <div className=" w-screen">
      <div className="w-[50%] m-auto">
        <div>
          <div>
            <h3 className="text-3xl font-bold">SIGN IN</h3>
            <p className="mt-3 mb-6">Insert your account information:</p>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
