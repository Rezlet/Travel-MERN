import React from "react";
import SignUp from "../components/SignUp/SignUp";
const SignUpPage = () => {
  return (
    <div
      style={{ minHeight: "calc(100vh - 270px)" }}
      className="d-flex align-items-center justify-content-center "
    >
      <SignUp></SignUp>
    </div>
  );
};

export default SignUpPage;
