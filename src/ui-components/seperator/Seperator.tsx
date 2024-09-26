import React from "react";
import "./Seperator.css";

interface SeperatorI {
  orSeperator?: boolean;
}

const Seperator = ({ orSeperator }: SeperatorI) => {
  return (
    <div className="seperator">
      <div className="line"></div>
      {orSeperator ? <span className="or">or</span> : null}
    </div>
  );
};

export default Seperator;
