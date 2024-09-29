import React from "react";
import { Route, Routes } from "react-router-dom";
import Authlayout from "../ui-components/authLayout/AuthLayout";
import Login from "../components/authLayout/login/Login";
import Register from "../components/authLayout/register/Register";
import ResetPassword from "../components/authLayout/reset-password/ResetPassword";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Authlayout />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="reset-password" element={<ResetPassword />} />
        <Route path="*" element={<Login />} />
      </Route>
    </Routes>
  );
};

export default AuthRoutes;
