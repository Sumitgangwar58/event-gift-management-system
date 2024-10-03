import React, { createContext } from "react";
import { User } from "./userContextProvider";
import useLocalStorage from "../hooks/useLocalStorage";

export type EventI = {
  owner: User;
  title: string;
  description: string;
  timeStamp: string;
  guestList?: User[];
  inviteList: { email: string; isAccepted: boolean }[];
  contributionList: { amount: number; user: User; timeStamp: string }[];
};

type createEventPayLoadType = {
  title: string;
  description: string;
  owner: User;
  inviteList: string[];
};

type editEventPayLoadType = {
  event: EventI;
  updatedData: {
    title?: string;
    description?: string;
    guestList?: string[];
  };
};

type inviteEventPayloadType = { event: EventI; email: string[] };
type deleteEventPayloadType = { event: EventI };

type EventContextType = {
  allEvents: EventI[];
  createEvent: (payload: createEventPayLoadType) => void;
  editEvent: (payload: editEventPayLoadType) => void;
  inviteGuest: (payload: inviteEventPayloadType) => void;
  deleteEvent: (payload: deleteEventPayloadType) => void;
};

const initialValue: EventContextType = {
  allEvents: [],
  createEvent: () => {},
  editEvent: () => {},
  inviteGuest: () => {},
  deleteEvent: () => {},
};

export const EventContext = createContext<EventContextType>(initialValue);

const key = "Events_Management";

const EventContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { data, updateData } = useLocalStorage(key);

  const createEvent = (payload: createEventPayLoadType) => {
    const newEvent: EventI = {
      title: payload.title,
      description: payload.description,
      inviteList: payload.inviteList.map((i) => ({
        email: i,
        isAccepted: false,
      })),
      owner: payload.owner,
      contributionList: [],
      timeStamp: new Date().getTime().toString(),
    };

    const newEvents = [...data, newEvent];
    updateData([...newEvents]);
  };

  const editEvent = (payload: editEventPayLoadType) => {
    const currentEvent = payload.event;
    const updatedEvents = [...data].map((i) => {
      if (i.timeStamp === currentEvent.timeStamp) {
        i.title = payload.updatedData.title ?? i.title;
        i.description = payload.updatedData.description ?? i.description;
        i.inviteList = payload.updatedData.guestList
          ? payload.updatedData.guestList.map((i) => ({
              email: i,
              isAccepted: false,
            }))
          : i.inviteList;
      }
      return i;
    });
    updateData([...updatedEvents]);
  };

  const inviteGuest = (payload: inviteEventPayloadType) => {
    const currentEvent = payload.event;
    const updatedEvents = [...data].map((i) => {
      if (i.timeStamp === currentEvent.timeStamp) {
        i.inviteList = [
          ...payload.email.map((i) => ({ email: i, isAccepted: false })),
          ...i.inviteList,
        ];
      }
      return i;
    });
    updateData([...updatedEvents]);
  };
  const deleteEvent = (payload: deleteEventPayloadType) => {
    const currentEvent = payload.event;
    const updatedEvents = [...data].filter(
      (i) => i.timeStamp !== currentEvent.timeStamp
    );
    updateData([...updatedEvents]);
  };

  return (
    <EventContext.Provider
      value={{
        allEvents: data,
        createEvent: createEvent,
        editEvent: editEvent,
        inviteGuest: inviteGuest,
        deleteEvent: deleteEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export default EventContextProvider;
