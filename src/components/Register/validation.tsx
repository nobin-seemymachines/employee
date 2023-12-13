import { Dispatch, SetStateAction } from "react";

interface User {
  email: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  email: string;
  password: string;
}

const emailValidation = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const passwordValidation = (password: string): boolean => {
  const passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-zA-Z]).{8,}$/;
  return passwordRegex.test(password);
};

const confirmPasswordValidation = (
  password: string,
  confirmPassword: string
): boolean => {
  return password === confirmPassword;
};

export const userValidation = (
  userData: User,
  setErrors: Dispatch<SetStateAction<Errors>>
): boolean => {
  setErrors((prevErrors) => ({
    ...prevErrors,
    email: "",
    password: "",
  }));

  const isEmailValid = emailValidation(userData.email);
  const isPasswordValid = passwordValidation(userData.password);
  const isConfirmPasswordValid = confirmPasswordValidation(
    userData.password,
    userData.confirmPassword
  );

  if (!isEmailValid) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: "Invalid email address",
    }));
  }

  if (!isPasswordValid) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      password:
        "Password must contain at least 1 digit, 1 special character, and be at least 8 characters long",
    }));
  }

  if (!isConfirmPasswordValid) {
    setErrors((prevErrors) => ({
      ...prevErrors,
      password: "Passwords do not match",
    }));
  }

  return isEmailValid && isPasswordValid && isConfirmPasswordValid;
};
