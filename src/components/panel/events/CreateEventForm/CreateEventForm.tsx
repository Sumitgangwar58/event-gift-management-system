import React, { useContext, useEffect, useMemo, useState } from "react";
import TextField from "../../../../ui-components/textField/TextField";
import "./CreateEventForm.css";
import Button from "../../../../ui-components/button/Button";
import { XIcon } from "../../../../assets/icons";
import validateField from "../../../../utilities/ValidationHelper";
import Modal from "../../../../ui-components/modal/Modal";
import { EventContext, EventI } from "../../../../context/EventContextProvider";
import { UserContext } from "../../../../context/userContextProvider";

type dataT = {
  title: string;
  description: string;
  guestList: string[];
};

type errorT = {
  title: string;
  description: string;
  guestInput: string;
};

interface CreateEventFormI {
  isOpen: boolean;
  onClose: () => void;
  value?: dataT;
  formType?: "Edit" | "Create" | "Invite People";
  workingEvent?: EventI;
}

const initialValue: dataT = {
  title: "",
  description: "",
  guestList: [],
};

const CreateEventForm = ({
  isOpen,
  onClose,
  value,
  formType,
  workingEvent,
}: CreateEventFormI) => {
  const { createEvent, editEvent, inviteGuest } = useContext(EventContext);
  const { ...user } = useContext(UserContext);
  const [data, setData] = useState<dataT>(initialValue);

  const [error, setError] = useState<errorT>({
    title: "",
    description: "",
    guestInput: "",
  });

  const [guestInput, setGuestInput] = useState<string>("");

  const handelDataChange = (
    value: string | string[],
    type: keyof typeof data
  ) => {
    setData((prev) => ({
      ...prev,
      [type]: value,
    }));
    if (type !== "guestList") {
      setError((prev) => ({
        ...prev,
        [type]: validateField(value, "simpleField", { fieldName: type }).error,
      }));
    }
  };

  const handelGuestInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const { error } = validateField(value, "email");
    setError((prev) => ({
      ...prev,
      guestInput: error,
    }));
    setGuestInput(value);
  };

  const addGuest = () => {
    const { error, hasError } = validateField(guestInput, "email");
    if (hasError) {
      setError((prev) => ({
        ...prev,
        guestInput: error,
      }));
      return;
    }

    const isEmaiAlreadyExist =
      formType === "Invite People"
        ? workingEvent?.inviteList.map((i) => i.email)?.includes(guestInput)
        : false;

    console.log(isEmaiAlreadyExist);

    if (data.guestList.includes(guestInput) || isEmaiAlreadyExist) {
      setError((prev) => ({
        ...prev,
        guestInput: "Email is already exists in guest list",
      }));
      return;
    }

    handelDataChange([...data.guestList, guestInput], "guestList");
  };

  const removeGuest = (guest: string) => {
    setData((prev) => ({
      ...prev,
      guestList: prev.guestList.filter((i) => i !== guest),
    }));
  };

  const resetForm = () => {
    setData(initialValue);
    setGuestInput("");
    setError({
      title: "",
      description: "",
      guestInput: "",
    });
  };

  const createAnEvent = () => {
    const prevErr = { ...error };
    let flag = false;
    if (data.title.trim() === "") {
      flag = true;
      prevErr.title = "Title is required";
    }
    if (data.description.trim() === "") {
      flag = true;
      prevErr.description = "Description is Required";
    }

    if (flag) {
      setError({ ...prevErr });
      return;
    } else {
      createEvent({
        title: data.title,
        description: data.description,
        owner: {
          name: user.userName ?? "",
          email: user.email,
          password: user.password,
          phone: user.phone,
        },
        inviteList: data.guestList,
      });
    }
    handelFormClose();
  };

  const editEventData = () => {
    const prevErr = { ...error };
    let flag = false;
    if (data.title.trim() === "") {
      flag = true;
      prevErr.title = "Title is required";
    }
    if (data.description.trim() === "") {
      flag = true;
      prevErr.description = "Description is Required";
    }
    if (flag) {
      setError({ ...prevErr });
    } else if (workingEvent) {
      editEvent({
        event: workingEvent,
        updatedData: {
          description: data.description,
          title: data.title,
          guestList: data.guestList,
        },
      });
      handelFormClose();
    }
  };

  const inviteGuestInEvent = () => {
    if (data.guestList.length === 0) {
      setError((prev) => ({
        ...prev,
        guestInput: "Add at least one guest email to invite",
      }));
      return;
    }
    if (workingEvent) {
      inviteGuest({
        email: data.guestList,
        event: workingEvent,
      });
      handelFormClose();
    }
  };

  const handelFormClose = () => {
    resetForm();
    onClose();
  };

  useEffect(() => {
    if (value) {
      setData(value);
    }
  }, [value]);

  const modalContentText = useMemo(() => {
    if (formType === "Create")
      return {
        heading: "Create Event",
        button: "Create",
      };
    else if (formType === "Edit")
      return {
        heading: "Edit Event",
        button: "Update",
      };
    else
      return {
        heading: "Invite People",
        button: "Invite",
      };
  }, [formType]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handelFormClose}
      heading={modalContentText.heading}
      footerActions={[
        <Button onClick={resetForm}>Reset</Button>,
        <Button style={{ marginLeft: "auto" }} onClick={handelFormClose}>
          Cancel
        </Button>,
        <Button
          variant="primary"
          onClick={
            formType === "Edit"
              ? editEventData
              : formType === "Create"
              ? createAnEvent
              : inviteGuestInEvent
          }
        >
          {modalContentText.button}
        </Button>,
      ]}
    >
      <form className="createEventForm">
        {formType === "Invite People" ? (
          <h3>{workingEvent?.title}</h3>
        ) : (
          <TextField
            label="Event Title"
            value={data.title}
            onChange={(e) => handelDataChange(e.target.value, "title")}
            helpText={error.title}
            hasError={error.title ? true : false}
          />
        )}
        {formType === "Invite People" ? (
          <p>{workingEvent?.description}</p>
        ) : (
          <TextField
            type="textarea"
            label="Event Description"
            value={data.description}
            onChange={(e) => handelDataChange(e.target.value, "description")}
            helpText={error.description}
            hasError={error.description ? true : false}
          />
        )}

        <h4>
          Invite Guests{" "}
          {formType !== "Invite People" ? (
            <span style={{ fontSize: "12px" }}>(optional)</span>
          ) : null}
        </h4>
        {data.guestList.length ? (
          <ul className="invite-guest-list">
            {data.guestList.map((i) => (
              <li key={i} className="invite-guest-item">
                <span>{i}</span>
                <Button variant="textButton" onClick={() => removeGuest(i)}>
                  <XIcon size={20} />
                </Button>
              </li>
            ))}
          </ul>
        ) : null}
        <div className="invite-input">
          <TextField
            label="Enter guest email"
            placeholder="guest@abc.com"
            type="email"
            value={guestInput}
            onChange={handelGuestInputChange}
            hasError={error.guestInput ? true : false}
            helpText={error.guestInput}
          />
          <Button onClick={addGuest} type="button">
            Add
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateEventForm;
