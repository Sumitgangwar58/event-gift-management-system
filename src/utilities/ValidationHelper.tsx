import { error } from "console";

// Email validation function
const validateEmail = (email: string) => {
  console.log("email");
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) {
    return { isValid: false, error: "Please Enter Email Address" };
  }
  if (!emailRegex.test(email)) {
    return { isValid: false, error: "Invalid Email Format." };
  }
  return { isValid: true, error: "" };
};

// Password validation function
const validatePassword = (password: string) => {
  const errors: string[] = [];
  if (!password.trim()) {
    errors.push("Please Enter Password");
  }

  if (errors.length > 0) {
    return { isValid: false, error: errors.join("--") };
  }

  return { isValid: true, error: "" };
};

// Simple field validation function
const validateSimpleField = (value: string, fieldName: string) => {
  if (!value.trim()) {
    return { isValid: false, error: `Please Enter ${fieldName}.` };
  }
  return { isValid: true, error: "" };
};

// Confirm password validation function
const validateConfirmPassword = (password: string, confirmPassword: string) => {
  if (!confirmPassword.trim()) {
    return { isValid: false, error: "Confirm Password is required." };
  }
  if (password !== confirmPassword) {
    return {
      isValid: false,
      error: "Passwords and Confirm Password does not match.",
    };
  }
  return { isValid: true, error: "" };
};

const validatePhone = (phoneNumber: string) => {
  if (!phoneNumber.trim()) {
    return { isValid: false, error: `Please enter phone number` };
  }
  if (phoneNumber.length !== 10) {
    return {
      isValid: false,
      error: `Phone number should be 10 digits and contains only number `,
    };
  }
  return { isValid: true, error: "" };
};

// Main validation function
const validateField = (
  value: any,
  type:
    | "tcCheckbox"
    | "email"
    | "password"
    | "simpleField"
    | "confirmPassword"
    | "phone"
    | "email or phone",
  options?: { password?: string; fieldName?: string }
) => {
  let validationResult = { isValid: false, error: "Invalid field type." };
  switch (type) {
    case "email":
      validationResult = validateEmail(value);
      break;
    case "password":
      validationResult = validatePassword(value);
      break;
    case "phone":
      validationResult = validatePhone(value);
      break;
    case "simpleField":
      validationResult = validateSimpleField(
        value,
        options?.fieldName || "Field"
      );
      break;
    case "confirmPassword":
      if (!options?.password) {
        return {
          isValid: false,
          hasError: true,
          error:
            value === ""
              ? "Please Enter Confirm Password"
              : "Password is required for confirmation.",
        };
      }
      validationResult = validateConfirmPassword(options.password, value);
      break;
    case "email or phone":
      if (isNaN(value)) {
        validationResult = validateEmail(value);
      } else validationResult = validatePhone(value);
      break;
  }

  return {
    isValid: validationResult.isValid,
    hasError: !validationResult.isValid,
    error: validationResult.error,
  };
};

export default validateField;
