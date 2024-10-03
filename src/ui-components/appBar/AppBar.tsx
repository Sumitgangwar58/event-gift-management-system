import React, { useContext } from "react";
import "./AppBar.css";
import { UserContext } from "../../context/userContextProvider";
import Button from "../button/Button";
import { LogoutIcon } from "../../assets/icons";

const AppBar = () => {
  const { changeValue, userName } = useContext(UserContext);
  return (
    <div className="appBar">
      <h3>{userName}</h3>
      <Button onClick={() => changeValue(false, "isLoggedIn")}>
        <LogoutIcon />
        Logout
      </Button>
    </div>
  );
};

export default AppBar;
