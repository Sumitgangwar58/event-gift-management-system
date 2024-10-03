import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/panel/Dashboard";
import Events from "../components/panel/events/Events";
import Panel from "../components/panel/Panel";
import RouteRedirector from "./RouteRedirector";
import EventContextProvider from "../context/EventContextProvider";
import ViewEvent from "../components/panel/events/viewEvent/ViewEvent";

const PanelRoutes = () => {
  return (
    <EventContextProvider>
      <Routes>
        <Route path="/panel" element={<Panel />}>
          <Route path="dahsboard" element={<Dashboard />} />
          <Route path="events">
            <Route index element={<Events />} />
            <Route path=":eventTimestamp" element={<ViewEvent />} />
          </Route>

          <Route
            path="*"
            element={<RouteRedirector url="/panel/dashboard" />}
          />
        </Route>
      </Routes>
    </EventContextProvider>
  );
};

export default PanelRoutes;
