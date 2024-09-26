import React, { HTMLInputTypeAttribute } from "react";
import "./TextField.css";

interface TextFieldI extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode;
  helpText?: React.ReactNode;
}

const TextField = ({ ...props }: TextFieldI) => {
  const { label, helpText } = props;
  return (
    <div className="textField__container">
      <label>
        {props.label ? (
          <span className="textField__label">{props.label}</span>
        ) : null}
        <input className="textField__input" {...props} />
        {helpText ? (
          <span className="textField__helpText">{helpText}</span>
        ) : null}
      </label>
    </div>
  );
};

export default TextField;
