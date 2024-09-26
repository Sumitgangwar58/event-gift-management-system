import React from "react";
import TextField from "../../ui-components/textField/TextField";
import Button from "../../ui-components/button/Button";
import Authlayout from "../../ui-components/authLayout/AuthLayout";
import "./Login.css";
import Seperator from "../../ui-components/seperator/Seperator";

const Login = () => {
  return (
    <Authlayout>
      <div className="login__container">
        <h3>Login</h3>
        <Seperator />
        <form className="login_form">
          <TextField type="email" label="Email" placeholder="abc@xyz.com" />
          {/* <Seperator orSeperator />
          <TextField type="phone" label="Phone no" placeholder="8546975247" /> */}
          <TextField
            type="password"
            label="Password"
            placeholder="Your Password"
          />
          <Button>Login</Button>
        </form>
      </div>
    </Authlayout>
  );
};

export default Login;
