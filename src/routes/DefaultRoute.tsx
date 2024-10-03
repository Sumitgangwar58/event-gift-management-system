import React, { useContext, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContextProvider";

const DefaultRoute = () => {
  const { isLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    isLoggedIn ? navigate("/panel/dashboard") : navigate("/login");
  }, []);

  return <></>;
};

export default DefaultRoute;
