import React, { useContext, useState } from "react";
import PageHeader from "../../../ui-components/pageHeader/PageHeader";
import Button from "../../../ui-components/button/Button";
import { AddPeople, CreateIcon, DonateIcon } from "../../../assets/icons";
import CreateEventForm from "./CreateEventForm/CreateEventForm";
import { EventContext, EventI } from "../../../context/EventContextProvider";
import "./Events.css";
import { isSameOwner } from "../../../utilities/userHelperFunctions";
import { User, UserContext } from "../../../context/userContextProvider";

const Events = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { allEvents, deleteEvent } = useContext(EventContext);
  const { email, password, phone, userName } = useContext(UserContext);
  const [formType, setFormType] = useState<
    "Create" | "Edit" | "Invite People" | undefined
  >("Create");

  const [createEventInitialValue, setCreateEventInitialValue] = useState<{
    title: string;
    description: string;
    guestList: string[];
  }>();
  const [workingEvent, setWorkingEvent] = useState<EventI>();

  const currentOwner: User = {
    name: userName ?? "",
    email: email,
    phone: phone,
    password: password,
  };

  const handleDeleteEvent = (event: EventI) => {
    deleteEvent({
      event: event,
    });
  };

  return (
    <div>
      <PageHeader
        title="Events"
        description="Check out all your events"
        hasBackIcon
        actions={
          <Button
            onClick={() => {
              setIsCreateModalOpen(true);
              setFormType("Create");
            }}
            variant="primary"
          >
            <CreateIcon color="currentColor" />
            Create New Event
          </Button>
        }
      />
      <CreateEventForm
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setFormType(undefined);
          setCreateEventInitialValue(undefined);
          setWorkingEvent(undefined);
        }}
        value={createEventInitialValue}
        formType={formType}
        workingEvent={workingEvent}
      />
      {allEvents.length ? (
        <ul className="event-list">
          {allEvents.map((event, ind) => {
            const sameOwner = isSameOwner(event.owner, currentOwner);
            return (
              <>
                <li className="event-list__item" key={event.timeStamp}>
                  <h4>
                    <span className="event-title">{event.title}</span>
                    {!sameOwner ? (
                      <Button>
                        <DonateIcon size={20} />
                      </Button>
                    ) : null}
                    {sameOwner ? (
                      <>
                        <Button
                          style={{ marginLeft: "auto" }}
                          onClick={() => {
                            setIsCreateModalOpen(true);
                            setFormType("Edit");
                            setWorkingEvent(event);
                            setCreateEventInitialValue({
                              title: event.title,
                              description: event.description,
                              guestList: event.inviteList.map((i) => i.email),
                            });
                          }}
                        >
                          Edit
                        </Button>
                        <Button onClick={() => handleDeleteEvent(event)}>
                          Delete
                        </Button>
                      </>
                    ) : null}
                  </h4>
                  <p className="event-description">{event.description}</p>
                  {sameOwner ? (
                    <Button
                      onClick={() => {
                        setFormType("Invite People");
                        setIsCreateModalOpen(true);
                        setWorkingEvent(event);
                      }}
                    >
                      <AddPeople size={20} color="currentColor" />
                      Invite Guests
                    </Button>
                  ) : null}
                </li>
              </>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default Events;
