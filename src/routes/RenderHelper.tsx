import React, { useContext } from "react";
import { UserContext } from "../context/userContextProvider";
import PanelRoutes from "./PanelRoutes";
import AuthRoutes from "./AuthRoutes";
import DefaultRoute from "./DefaultRoute";

const RenderRoutes = () => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <>
      <DefaultRoute />
      {isLoggedIn ? <PanelRoutes /> : <AuthRoutes />}
    </>
  );
};

export default RenderRoutes;
