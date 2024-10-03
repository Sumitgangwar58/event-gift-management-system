import React from "react";
import Button from "../button/Button";
import { BackIcon } from "../../assets/icons";
import { useNavigate } from "react-router-dom";
import "./PageHeader.css";

interface PageHeaderI {
  title: string;
  description?: string;
  hasBackIcon?: boolean;
  actions?: React.ReactNode;
}

const PageHeader = ({ ...props }: PageHeaderI) => {
  const navigator = useNavigate();
  return (
    <div className="pageHeader">
      {props.hasBackIcon ? (
        <Button variant="textButton" onClick={() => navigator(-1)}>
          <BackIcon />
        </Button>
      ) : null}
      <div className="pageHeader__content">
        <h3>{props.title}</h3>
        {props.description ? <p>{props.description}</p> : null}
      </div>
      {props.actions ? (
        <div className="pageHeader__action-container">{props.actions}</div>
      ) : null}
    </div>
  );
};

export default PageHeader;
