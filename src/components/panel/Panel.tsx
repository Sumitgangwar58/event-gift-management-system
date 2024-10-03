import { Outlet, useLocation } from "react-router-dom";
import SideBar, { SideBarOptionsI } from "../../ui-components/sidebar/SideBar";
import "./Panel.css";
import AppBar from "../../ui-components/appBar/AppBar";
import { DashboardIcon, EventsIcon } from "../../assets/icons";

const routeOptions: SideBarOptionsI[] = [
  {
    icon: <DashboardIcon color="currentColor" />,
    href: "dashboard",
    title: "Dashboard",
  },
  {
    icon: <EventsIcon color="currentColor" />,
    href: "events",
    title: "Events",
  },
];

const PanelLayout = () => {
  return (
    <div className="panel-layout">
      <SideBar options={routeOptions} logo="Gift Management" />
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
