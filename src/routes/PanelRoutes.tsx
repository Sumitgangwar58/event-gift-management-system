import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/panel/dashboard/Dashboard";
import Events from "../components/panel/events/Events";
import Panel from "../components/panel/Panel";
import RouteRedirector from "./RouteRedirector";
import EventContextProvider from "../context/EventContextProvider";
import Invitation from "../components/panel/invites/Invitation";

const PanelRoutes = () => {
  return (
    <EventContextProvider>
      <Routes>
        <Route path="/panel" element={<Panel />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="events">
            <Route index element={<Events />} />
          </Route>
          <Route path="invitations" element={<Invitation />} />

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
