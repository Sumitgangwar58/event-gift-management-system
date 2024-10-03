import { User } from "../context/userContextProvider";

export const isSameOwner = (a: User, b: User): boolean => {
  return (Object.keys(a) as (keyof User)[]).every((key) => a[key] === b[key]);
};
