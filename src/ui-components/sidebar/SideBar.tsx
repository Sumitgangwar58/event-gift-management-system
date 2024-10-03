import React from "react";
import "./SideBar.css";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";

export type SideBarOptionsI = {
  title: string;
  href: string;
  icon: React.ReactNode;
};
interface SideBarI {
  logo: React.ReactNode;
  options: SideBarOptionsI[];
}

const SideBar = ({ ...props }: SideBarI) => {
  const { logo, options } = props;

  const location = useLocation();
  console.log(location.pathname, location.pathname.includes("dashboard"));
  return (
    <aside className="sidebar__container">
      <div className="sidebar__logo-container">{logo}</div>
      <nav className="sidebar__navigation-container">
        {options.map((i) => (
          <Link
            className={classNames({
              "sidebar__nav-link": true,
              active: location.pathname.includes(i.href),
            })}
            key={i.href}
            to={i.href}
          >
            {i.icon}
            <div className="sidebar__nav-title">{i.title}</div>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default SideBar;
