import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../components/panel/Dashboard";
import Events from "../components/panel/Events";
import PanelLayout from "../ui-components/panelLayout/PanelLayout";

const PanelRoutes = () => {
  return (
    <Routes>
      <Route path="/panel" element={<PanelLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="events" element={<Events />} />
        <Route path="*" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default PanelRoutes;
