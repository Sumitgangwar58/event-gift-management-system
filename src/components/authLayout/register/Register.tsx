import React, { useContext, useState } from "react";
import "./Register.css";
import Authlayout from "../../../ui-components/authLayout/AuthLayout";
import Seperator from "../../../ui-components/seperator/Seperator";
import TextField from "../../../ui-components/textField/TextField";
import Button from "../../../ui-components/button/Button";
import { Link } from "react-router-dom";
import validateField from "../../../utilities/ValidationHelper";
import { UserContext } from "../../../context/userContextProvider";
import { ForwardIcon } from "../../../assets/icons";

const initialValue = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  phone: "",
};

const Register = () => {
  const [formData, setFormData] = useState(initialValue);

  const [isAccountCreated, setIsAccountCreated] = useState(false);
  const [errors, setErrors] = useState(initialValue);

  const { usersList, createUser } = useContext(UserContext);

  const handelChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: keyof typeof formData
  ) => {
    const value = e.target.value;
    const { error } = validateField(
      value,
      type === "name" ? "simpleField" : type,
      {
        password: formData.password,
      }
    );
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
      const { error } = validateField(
        value,
        key === "name" ? "simpleField" : key,
        {
          password: formData.password,
          fieldName: key === "name" ? "Full Name" : "",
        }
      );
      newErrors[key] = error;
      if (error) flag = false;
    });

    setErrors({ ...newErrors });

    if (!flag) return;

    usersList?.forEach((user) => {
      if (user.email === formData.email) {
        newErrors.email =
          "Email is already exists. Try with different Email Address";
        flag = false;
      }
      if (user.phone === formData.phone) {
        newErrors.phone =
          "Phone number is already exists. Try with different Phone Number";
        flag = false;
      }
    });

    if (!flag) {
      setErrors({ ...newErrors });
      return;
    }

    createUser({
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      name: formData.name,
    });
    setIsAccountCreated(true);
  };

  return (
    <>
      {!isAccountCreated ? (
        <div className="register__container container">
          <h3>Register</h3>
          <Seperator />
          <form className="login_form" onSubmit={handelSubmit}>
            <TextField
              type="text"
              label="Full Name"
              placeholder="John Doe"
              value={formData.name}
              onChange={(e) => handelChange(e, "name")}
              hasError={errors.name ? true : false}
              helpText={errors.name}
            />
            <TextField
              type="email"
              label="Email"
              placeholder="abc@xyz.com"
              value={formData.email}
              onChange={(e) => handelChange(e, "email")}
              hasError={errors.email ? true : false}
              helpText={errors.email}
            />
            <TextField
              type="tel"
              label="Phone No"
              placeholder="Your mobile number"
              value={formData.phone}
              onChange={(e) => handelChange(e, "phone")}
              hasError={errors.phone ? true : false}
              helpText={errors.phone}
            />
            <TextField
              type="password"
              label="Password"
              placeholder="Your Password"
              value={formData.password}
              onChange={(e) => handelChange(e, "password")}
              hasError={errors.password ? true : false}
              helpText={errors.password}
            />
            <TextField
              type="text"
              label="Confirm Password"
              placeholder="Re-Enter your Password"
              value={formData.confirmPassword}
              onChange={(e) => handelChange(e, "confirmPassword")}
              hasError={errors.confirmPassword ? true : false}
              helpText={errors.confirmPassword}
            />
            <Button className="submit-button" variant="primary" isFullWidth>
              Create Account
            </Button>
          </form>
          <p>
            Already have account ? <Link to={"/login"}>Login</Link>
          </p>
        </div>
      ) : (
        <div className="container">
          <h3>Account Created Successfully</h3>
          <Link to="/login">
            <ForwardIcon size={20} color="currentColor" /> Proceed to Login
          </Link>
        </div>
      )}
    </>
  );
};

export default Register;
