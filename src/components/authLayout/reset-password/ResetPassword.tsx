import React, { useContext, useState } from "react";
import TextField from "../../../ui-components/textField/TextField";
import Button from "../../../ui-components/button/Button";
import { Link } from "react-router-dom";
import { BackIcon, ForwardIcon } from "../../../assets/icons";
import validateField from "../../../utilities/ValidationHelper";
import { UserContext } from "../../../context/userContextProvider";

const initialValue = {
  email: "",
  password: "",
};

const ResetPassword = () => {
  const [formData, setFormData] = useState(initialValue);
  const [errors, setErrors] = useState(initialValue);
  const { usersList, changeValue } = useContext(UserContext);
  const [isPasswordChanged, setIsPasswordChanged] = useState(false);

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
      const { error } = validateField(value, key);
      newErrors[key] = error;
      if (error) flag = false;
    });
    setErrors({ ...newErrors });

    if (!flag) return;
    usersList.forEach((user) => {
      if (user.email === formData.email) flag = true;
    });
    if (!flag) {
      setErrors((prev) => ({
        ...prev,
        email: "Email is not exists in database",
      }));
      return;
    }
    changeValue(formData.password, "password", { email: formData.email });
    setIsPasswordChanged(true);
  };
  return (
    <>
      {!isPasswordChanged ? (
        <div className="reset-password__container container">
          <h3>Reset Password</h3>
          <form onSubmit={handelSubmit}>
            <TextField
              label="Email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={(e) => handelChange(e, "email")}
              hasError={errors.email ? true : false}
              helpText={errors.email}
            />
            <TextField
              label="New Password"
              placeholder="Enter new Password"
              value={formData.password}
              onChange={(e) => handelChange(e, "password")}
              hasError={errors.password ? true : false}
              helpText={errors.password}
            />
            <Button isFullWidth variant="primary">
              Reset Password
            </Button>
          </form>
          <Link to={"/login"}>
            <BackIcon color="currentColor" />
            Back to Login
          </Link>
        </div>
      ) : (
        <div className="container">
          <h3>Password Changed Successfully</h3>
          <Link to="/login">
            <ForwardIcon size={20} color="currentColor" /> Proceed to Login
          </Link>
        </div>
      )}
    </>
  );
};

export default ResetPassword;
