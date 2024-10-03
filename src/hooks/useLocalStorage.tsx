import React, { useEffect, useState } from "react";

const useLocalStorage = (key: string) => {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    const storageData = localStorage.getItem(key) ?? "";
    if (storageData) {
      setData(JSON.parse(storageData ?? ""));
    }
  }, [key]);

  const updateData = (data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
    setData(data);
  };

  return { data, updateData };
};

export default useLocalStorage;
