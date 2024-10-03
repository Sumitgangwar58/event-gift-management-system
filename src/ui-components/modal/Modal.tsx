import React from "react";
import Button from "../button/Button";
import { XIcon } from "../../assets/icons";
import PortalComponent from "../PortalComponent/PortalComponent";

import "./Modal.css";

interface ModalI {
  heading: string;
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  footerActions: React.ReactNode[];
}

const Modal = ({ ...props }: ModalI) => {
  return (
    <>
      {props.isOpen ? (
        <PortalComponent>
          <div className="modal__backdrop" />
          <div className="modal">
            <div className="modal__header">
              <h3>{props.heading}</h3>
              <Button variant="iconButton" onClick={props.onClose}>
                <XIcon color="currentColor" size={20} />
              </Button>
            </div>
            <div className="modal__body">{props.children}</div>
            <div className="modal__footer">
              {props.footerActions.map((i, ind) => (
                <React.Fragment key={ind}>{i}</React.Fragment>
              ))}
            </div>
          </div>
        </PortalComponent>
      ) : null}
    </>
  );
};

export default Modal;
