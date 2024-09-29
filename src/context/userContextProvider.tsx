import React, { createContext, useEffect, useState } from "react";

type UserContextType = {
  userName: string | null;
  email: string;
  password: string;
  phone: string;
  changeValue: (
    value: string | boolean,
    type: "userName" | "email" | "password" | "phone" | "isLoggedIn"
  ) => void;
  isLoggedIn: boolean;
};

const initialValue: UserContextType = {
  userName: null,
  email: "",
  password: "",
  phone: "",
  changeValue: () => {},
  isLoggedIn: false,
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

  const changeValue = (value: string | boolean, type: keyof typeof data) => {
    setData((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(data));
  }, [data]);

  return (
    <UserContext.Provider value={{ ...data, changeValue }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
