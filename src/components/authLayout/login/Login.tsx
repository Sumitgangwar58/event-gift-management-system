import React, { useContext, useMemo, useState } from "react";
import TextField from "../../../ui-components/textField/TextField";
import Button from "../../../ui-components/button/Button";
import Authlayout from "../../../ui-components/authLayout/AuthLayout";
import "./Login.css";
import Seperator from "../../../ui-components/seperator/Seperator";
import { Link, useNavigate } from "react-router-dom";
import validateField from "../../../utilities/ValidationHelper";
import { UserContext } from "../../../context/userContextProvider";

const initialValue = {
  email: "",
  password: "",
  phone: "",
};

const Login = () => {
  const [formData, setFormData] = useState(initialValue);
  const [withPhone, setWithPhone] = useState(false);
  const [errors, setErrors] = useState(initialValue);
  const { email, password, phone, changeValue } = useContext(UserContext);
  const navigator = useNavigate();

  const handelChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: keyof typeof formData
  ) => {
    const value = e.target.value;
    const { error } = validateField(value, type);
    let newData = { ...formData };
    let newErrors = { ...errors };
    newData[type] = value;
    newErrors[type] = error;

    setFormData({ ...newData });
    setErrors({ ...newErrors });
  };

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let newErrors = { ...errors };
    let flag = true;
    Object.entries(formData).map((i) => {
      const key = i[0] as keyof typeof formData;
      const value = i[1];
      if (
        (key === "email" && !withPhone) ||
        (key === "phone" && withPhone) ||
        key === "password"
      ) {
        const { error } = validateField(value, key);
        newErrors[key] = error;
        if (error) flag = false;
      }
    });
    setErrors({ ...newErrors });

    if (!flag) return;

    if (
      password !== formData.password ||
      (formData.email !== email && !withPhone) ||
      (formData.phone !== phone && withPhone)
    ) {
      setErrors((prev) => ({
        ...prev,
        password: `Invalid ${withPhone ? "Phone" : "Email"} / Password`,
      }));
      return;
    }

    changeValue(true, "isLoggedIn");
    navigator("/panel");
  };

  console.log(errors);

  const handelFieldChange = () => {
    let newData = { ...formData };
    withPhone ? (newData.phone = "") : (newData.email = "");
    setFormData({ ...newData });
    setErrors({ ...initialValue });
    setWithPhone((prev) => !prev);
  };

  return (
    <div className="login__container container">
      <h3>Login</h3>
      <Seperator />
      <form className="login_form" onSubmit={handelSubmit}>
        <div className="input-with-option">
          <TextField
            type={withPhone ? "tel" : "email"}
            label={withPhone ? "Phone" : "Email"}
            placeholder={withPhone ? "8954******" : "abc@xyz.com"}
            value={withPhone ? formData.phone : formData.email}
            onChange={(e) => handelChange(e, withPhone ? "phone" : "email")}
            helpText={withPhone ? errors.phone : errors.email}
            hasError={
              withPhone
                ? errors.phone
                  ? true
                  : false
                : errors.email
                ? true
                : false
            }
          />
          <Button
            variant="textButton"
            type="button"
            onClick={handelFieldChange}
          >
            Continue With {!withPhone ? "Phone" : "Email"}
          </Button>
        </div>
        <div className="input-with-option">
          <TextField
            type="password"
            label="Password"
            placeholder="Your Password"
            value={formData.password}
            onChange={(e) => handelChange(e, "password")}
            helpText={errors.password}
            hasError={errors.password ? true : false}
          />
          <Link
            style={{ textAlign: "right", display: "block" }}
            to={"reset-password"}
          >
            Forgot Password
          </Link>
        </div>
        <Button className="submit-button" variant="primary" isFullWidth>
          Login
        </Button>
      </form>
      <p>
        Don't have account ? <Link to={"/register"}>Create Account</Link>
      </p>
    </div>
  );
};

export default Login;
