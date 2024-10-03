import React from "react";
import "./Button.css";
import classNames from "classnames";

interface ButtonI extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "textButton" | "default" | "iconButton";
  isFullWidth?: boolean;
}

const Button = ({ ...props }: ButtonI) => {
  const {
    variant = "default",
    children,
    isFullWidth,
    className,
    style,
    ...rest
  } = props;
  return (
    <div
      className={classNames({
        button__container: true,
        [variant]: variant,
        fullWidth: isFullWidth,
        [className as string]: className,
      })}
      style={style}
    >
      <button className="button__input" {...rest}>
        <span className="button__text">{children}</span>
      </button>
    </div>
  );
};

export default Button;
