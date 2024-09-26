import React from "react";
import "./Button.css";

interface ButtonI extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = ({ ...props }: ButtonI) => {
  return (
    <div className="button__container">
      <button className="button__input" {...props} />
    </div>
  );
};

export default Button;
