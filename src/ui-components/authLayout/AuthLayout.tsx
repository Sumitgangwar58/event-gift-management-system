import React from "react";
import "./AuthLayout.css";
import { Outlet } from "react-router-dom";

interface AuthLayoutI {
  // children: React.ReactNode;
}

const Authlayout = ({ ...props }: AuthLayoutI) => {
  // const { children } = props;
  return (
    <div className="authLayout__container">
      <div className="authLayout__item">
        <div className="app-name">
          <h1>Gift Management App</h1>
          <h3>For Events</h3>
        </div>

        <p className="app-description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum,
          dolores, labore magni voluptas impedit unde molestiae voluptatibus
          atque totam reprehenderit maiores voluptatum quia dicta enim quae
          dolore sunt est provident?
        </p>
      </div>
      <div className="authLayout__item">
        <Outlet />
        <div className="footer">copyright@sumit</div>
      </div>
    </div>
  );
};

export default Authlayout;
