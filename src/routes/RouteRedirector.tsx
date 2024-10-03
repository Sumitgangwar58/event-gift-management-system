import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RouteRedirector = ({ url }: { url: string }) => {
  const navigator = useNavigate();
  useEffect(() => {
    navigator(url);
  }, []);
  return <></>;
};

export default RouteRedirector;
