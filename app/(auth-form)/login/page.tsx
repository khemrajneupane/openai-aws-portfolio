import AuthForm from "@/components/authForm/AuthForm";
import React from "react";

const LoginPage = () => {
  return (
    <div className="w-1/2 mx-auto">
      <AuthForm type="login" />
    </div>
  );
};

export default LoginPage;
