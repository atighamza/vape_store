import { useEffect } from "react";
import "./App.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import axiosInstance from "./api/api";

function App() {
  const fetch = async () => {
    axiosInstance
      .get("")
      .then((res) => console.log(""))
      .catch((err) => console.log(""));
  };
  return (
    <>
      <Login />
      <button onClick={fetch}>test</button>
    </>
  );
}

export default App;
