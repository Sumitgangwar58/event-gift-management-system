import React, { useContext, useMemo, useState } from "react";
import PageHeader from "../../../ui-components/pageHeader/PageHeader";
import Button from "../../../ui-components/button/Button";
import {
  AddPeople,
  CreateIcon,
  DonateIcon,
  EyeOn,
} from "../../../assets/icons";
import CreateEventForm from "./CreateEventForm/CreateEventForm";
import { EventContext, EventI } from "../../../context/EventContextProvider";
import "./Events.css";
import { isSameOwner } from "../../../utilities/userHelperFunctions";
import { User, UserContext } from "../../../context/userContextProvider";
import classNames from "classnames";
import Modal from "../../../ui-components/modal/Modal";
import TextField from "../../../ui-components/textField/TextField";
import ViewEvent from "./viewEvent/ViewEvent";

const Events = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const { allEvents, deleteEvent, contributeToEvent } =
    useContext(EventContext);
  const { owner } = useContext(UserContext);
  const [formType, setFormType] = useState<
    "Create" | "Edit" | "Invite People" | undefined
  >("Create");

  const [createEventInitialValue, setCreateEventInitialValue] = useState<{
    title: string;
    description: string;
    guestList: string[];
  }>();
  const [workingEvent, setWorkingEvent] = useState<EventI>();
  const [activeTab, setActiveTab] = useState<"myEvent" | "inviteEvent">(
    "myEvent"
  );

  const [contributionModal, setContributionModal] = useState<{
    isOpen: boolean;
    event?: EventI;
    amountInput: string;
    error: string;
  }>({
    isOpen: false,
    amountInput: "",
    error: "",
  });

  const [viewModal, setViewModal] = useState<{
    isOpen: boolean;
    event?: EventI;
  }>({
    isOpen: false,
  });

  const handleDeleteEvent = (event: EventI) => {
    deleteEvent({
      event: event,
    });
  };

  const myEvents = useMemo(() => {
    return allEvents.filter((event) => isSameOwner(event.owner, owner));
  }, [allEvents]);

  const invitedEvents = useMemo(() => {
    return allEvents.filter((event) => {
      if (isSameOwner(event.owner, owner)) return false;
      if (event.guestList.map((i) => i.email).includes(owner?.email ?? ""))
        return true;
      return false;
    });
  }, [allEvents]);

  const handleContributionClose = () => {
    setContributionModal({
      isOpen: false,
      amountInput: "",
      event: undefined,
      error: "",
    });
  };

  const handleContribute = () => {
    if (contributionModal.amountInput === "") {
      setContributionModal((prev) => ({
        ...prev,
        error: "Enter amount to contribute",
      }));
    } else if (Number(contributionModal.amountInput) < 1) {
      setContributionModal((prev) => ({
        ...prev,
        error: "Amount Should be greater than 0",
      }));
    } else if (contributionModal.event) {
      contributeToEvent(
        Number(contributionModal.amountInput),
        contributionModal.event
      );
      setContributionModal({
        amountInput: "",
        error: "",
        isOpen: false,
      });
    }
  };

  const handleContributionAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setContributionModal((prev) => ({
      ...prev,
      error: Number(value) < 1 ? "Amount Should be greater than 0" : "",
      amountInput: value,
    }));
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

      <Modal
        isOpen={contributionModal.isOpen}
        heading="Contribute to event"
        onClose={handleContributionClose}
        footerActions={[
          <Button
            style={{ marginLeft: "auto" }}
            onClick={handleContributionClose}
          >
            Cancel
          </Button>,
          <Button onClick={handleContribute} variant="primary">
            Contribute
          </Button>,
        ]}
      >
        <div className="contribution-content">
          <h4>{contributionModal.event?.title}</h4>
          <p>{contributionModal.event?.description}</p>

          <TextField
            type="number"
            min={1}
            label="Enter Contribution Amount"
            value={contributionModal.amountInput}
            onChange={handleContributionAmountChange}
            hasError={contributionModal.error ? true : false}
            helpText={contributionModal.error}
          />
        </div>
      </Modal>

      <ViewEvent
        isOpen={viewModal.isOpen}
        event={viewModal.event}
        onClose={() => setViewModal({ isOpen: false })}
      />

      <ul className="tabs">
        <li
          onClick={() => setActiveTab("myEvent")}
          className={classNames({ active: activeTab === "myEvent" })}
        >
          My Events
        </li>
        <li
          onClick={() => setActiveTab("inviteEvent")}
          className={classNames({ active: activeTab === "inviteEvent" })}
        >
          Invited Events
        </li>
      </ul>
      {activeTab === "myEvent" && myEvents.length ? (
        <ul className="event-list">
          {myEvents.map((event, ind) => {
            return (
              <li className="event-list__item" key={event.timeStamp}>
                <h4>
                  <span className="event-title">
                    {event.title}
                    <Button
                      variant="iconButton"
                      onClick={() =>
                        setViewModal({ isOpen: true, event: event })
                      }
                    >
                      <EyeOn color="currentColor" />
                    </Button>
                  </span>

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
                </h4>
                <p className="event-description">{event.description}</p>
                <p>
                  Contribution Received :{" "}
                  <span>
                    {event.contributionList.reduce(
                      (acc, current) => acc + current.amount,
                      0
                    )}
                  </span>
                </p>
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
              </li>
            );
          })}
        </ul>
      ) : null}
      {activeTab === "inviteEvent" && invitedEvents.length ? (
        <ul className="event-list">
          {invitedEvents.map((event, ind) => {
            let contributedAmount = 0;
            event.contributionList.map((item) => {
              if (isSameOwner(item.user, owner))
                contributedAmount = item.amount;
            });
            return (
              <li className="event-list__item" key={event.timeStamp}>
                <h4>
                  <span className="event-title">{event.title}</span>
                  {contributedAmount > 0 ? (
                    <span>Contributed : {contributedAmount}</span>
                  ) : (
                    <Button
                      onClick={() =>
                        setContributionModal({
                          isOpen: true,
                          event: event,
                          amountInput: "",
                          error: "",
                        })
                      }
                    >
                      <DonateIcon size={20} />
                    </Button>
                  )}
                </h4>
                <p>
                  By
                  <span className="by"> {event.owner.name}</span>
                </p>
                <p className="event-description">{event.description}</p>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default Events;
