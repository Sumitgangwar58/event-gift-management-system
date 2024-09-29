import React, { HTMLInputTypeAttribute } from "react";
import "./TextField.css";
import classNames from "classnames";
import { ErrorIcon } from "../../assets/icons";

interface TextFieldI extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  helpText?: React.ReactNode;
  hasError?: boolean;
}

const TextField = ({ ...props }: TextFieldI) => {
  const { label, helpText, hasError, ...rest } = props;
  return (
    <div
      className={classNames({
        textField__container: true,
        hasError: hasError,
      })}
    >
      <label>
        {props.label ? (
          <span className="textField__label">{props.label}</span>
        ) : null}
        <input className="textField__input" {...rest} />
        {helpText ? (
          <span className="textField__helpText">
            {hasError ? <ErrorIcon color="currentColor" size={18} /> : null}
            {helpText}
          </span>
        ) : null}
      </label>
    </div>
  );
};

export default TextField;
