import React, { useContext } from "react";
import Button from "../button/Button";
import { UserContext } from "../../context/userContextProvider";
import "./AppBar.css";

const AppBar = () => {
  const { changeValue, userName } = useContext(UserContext);
  return (
    <div className="appBar">
      <h3>{userName}</h3>
      <Button onClick={() => changeValue(false, "isLoggedIn")}>Logout</Button>
    </div>
  );
};

export default AppBar;
