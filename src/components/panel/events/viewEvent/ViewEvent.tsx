import React from "react";
import "./ViewEvent.css";
import { EventI } from "../../../../context/EventContextProvider";
import Modal from "../../../../ui-components/modal/Modal";
import Button from "../../../../ui-components/button/Button";
import { isSameOwner } from "../../../../utilities/userHelperFunctions";

interface ViewEventI {
  isOpen: boolean;
  onClose: () => void;
  event?: EventI;
}

const ViewEvent = ({ isOpen, onClose, event }: ViewEventI) => {
  if (!event) return <></>;
  return (
    <Modal
      customClass="view-modal"
      isOpen={isOpen}
      onClose={onClose}
      heading="View Event Details"
      footerActions={[<Button variant="primary" style={{marginLeft : "auto"}} onClick={onClose}>Close</Button>]}
    >
      <div className="event-title-container">
        <h4>Event Title</h4>
        <p>{event.title}</p>
      </div>
      <div className="event-description-container">
        <h4>Event Description</h4>
        <p>{event.description}</p>
      </div>
      <div className="guest-list-container">
        <h4>Guest List</h4>

        <table>
          <thead>
            <tr>
              <th>Guest Name</th>
              <th>Contribution</th>
            </tr>
          </thead>
          <tbody>
            {event.guestList.map((guest) => {
              const contributedAmount =
                event.contributionList.filter((i) =>
                  isSameOwner(i.user, guest)
                )[0]?.amount ?? 0;
              return (
                <tr>
                  <td>{guest.name}</td>
                  <td>{contributedAmount}</td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td>Total Contribution</td>
              <td>
                {event.contributionList.reduce((acc, i) => acc + i.amount, 0)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <div className="pending-guest-container">
        <h4>Pending Invites</h4>
        <ul className="pending-invite-list">
          {event.inviteList
            .filter((i) => i.isAccepted === false)
            .map((guest) => (
              <li>{guest.email}</li>
            ))}
        </ul>
      </div>
    </Modal>
  );
};

export default ViewEvent;
