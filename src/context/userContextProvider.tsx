import React, { createContext, useEffect, useState } from "react";

export type User = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

type UserContextType = {
  usersList: User[];
  changeValue: (
    value: string | boolean,
    type: "isLoggedIn" | "password",
    options?: { email: string }
  ) => void;
  isLoggedIn: boolean;
  createUser: (user: User) => void;
  owner?: User;
  logInUser: (userEmail: string) => void;
};

const initialValue: UserContextType = {
  usersList: [],
  changeValue: () => {},
  isLoggedIn: false,
  createUser: () => {},
  logInUser: () => {},
};

export const UserContext = createContext<UserContextType>(initialValue);

const storageKey = "eventManagement";

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<UserContextType>(() => {
    if (localStorage.getItem(storageKey)) {
      return JSON.parse(localStorage.getItem(storageKey) ?? "");
    }
    return initialValue;
  });

  const changeValue = (
    value: string | boolean,
    type: "isLoggedIn" | "password",
    options?: { email: string }
  ) => {
    if (type === "password" && options && typeof value === "string") {
      const newUserList = data.usersList.map((i) => {
        if (i.email === options.email) i.password = value;
        return i;
      });
      setData((prev) => ({
        ...prev,
        usersList: [...newUserList],
      }));
    } else if (typeof value === "boolean")
      setData((prev) => ({
        ...prev,
        [type]: value,
      }));
  };

  const createUser = (user: User) => {
    const newUserList = [...data.usersList, user];
    setData((prev) => ({
      ...prev,
      usersList: [...newUserList],
    }));
  };

  const logInUser = (userEmail: string) => {
    setData((prev) => ({
      ...prev,
      isLoggedIn: true,
      owner: data.usersList.filter((user) => user.email === userEmail)[0],
    }));
  };

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(data));
  }, [data]);

  return (
    <UserContext.Provider
      value={{ ...data, changeValue, createUser, logInUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
