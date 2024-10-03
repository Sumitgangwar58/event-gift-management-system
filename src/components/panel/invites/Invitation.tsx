import React, { useContext, useMemo } from "react";
import { EventContext } from "../../../context/EventContextProvider";
import { UserContext } from "../../../context/userContextProvider";
import { isSameOwner } from "../../../utilities/userHelperFunctions";
import Button from "../../../ui-components/button/Button";

import "./Invitation.css";
import PageHeader from "../../../ui-components/pageHeader/PageHeader";

type Props = {};

const Invitation = (props: Props) => {
  const { allEvents, acceptInvite } = useContext(EventContext);
  const { owner } = useContext(UserContext);

  const myInvites = useMemo(() => {
    return allEvents.filter((event) => {
      let flag = false;
      if (isSameOwner(event.owner, owner)) return flag;
      event.inviteList.forEach((i) => {
        if (i.email === owner?.email && i.isAccepted === false) {
          flag = true;
        }
      });
      return flag;
    });
  }, [allEvents]);
  return (
    <div className="invitation-container">
      <PageHeader
        title="Invitations"
        description="Check all your Invitation here"
      />
      <ul className="invitation-list">
        {myInvites.map((event) => {
          return (
            <li key={event.owner.email} className="invitation-item">
              <div className="event-details">
                <h4>{event.title}</h4>
                <p> by {event.owner.name}</p>
              </div>
              {event.guestList.length ? (
                <ul className="guest-list">
                  <span>Guest List : </span>
                  {event.guestList.map((i, ind) => (
                    <li className="guest-list__item" key={ind}>{i.name}</li>
                  ))}
                </ul>
              ) : null}
              <Button onClick={() => acceptInvite(event)}>Accept</Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Invitation;
