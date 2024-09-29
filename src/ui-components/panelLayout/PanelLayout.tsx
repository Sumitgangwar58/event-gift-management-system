import { Outlet } from "react-router-dom";
import AppBar from "../appBar/AppBar";
import SideBar from "../sidebar/SideBar";
import "./PanelLayout.css";

const PanelLayout = () => {
  return (
    <div className="panel-layout">
      <SideBar />
      <div className="main__container">
        <AppBar />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default PanelLayout;
