import React, { useContext } from "react";
import "./AppBar.css";
import { UserContext } from "../../context/userContextProvider";
import Button from "../button/Button";
import { LogoutIcon, MenuIcon } from "../../assets/icons";

const AppBar = () => {
  const { changeValue, owner } = useContext(UserContext);

  const openSideBar = () => {
    document.documentElement.classList.add("has-sidebar-active");
  };
  return (
    <div className="appBar">
      <Button
        className="appbar-menu-button"
        variant="iconButton"
        onClick={openSideBar}
      >
        <MenuIcon />
      </Button>
      <h3>{owner?.name}</h3>
      <Button
        style={{ marginLeft: "auto" }}
        onClick={() => changeValue(false, "isLoggedIn")}
      >
        <LogoutIcon />
        Logout
      </Button>
    </div>
  );
};

export default AppBar;
