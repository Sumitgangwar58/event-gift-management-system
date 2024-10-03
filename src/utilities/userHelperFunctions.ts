import { User } from "../context/userContextProvider";

export const isSameOwner = (a?: User, b?: User): boolean => {
  if(!a || !b) return false
  return (Object.keys(a) as (keyof User)[]).every((key) => a[key] === b[key]);
};
