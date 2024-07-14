import React from "react";
import LoginForm from "../components/Login/Login";
import Navbar from "../components/Navbar/Navbar";

const Login: React.FC = () => {
  return (
    <>
      <Navbar />
      <LoginForm />
    </>
  );
};

export default Login;
