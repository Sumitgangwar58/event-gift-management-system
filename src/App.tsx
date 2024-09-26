import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Authlayout from "./ui-components/authLayout/AuthLayout";
import Login from "./components/authLayout/Login";

function App() {
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default App;
