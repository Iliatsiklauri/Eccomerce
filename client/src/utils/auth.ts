import { ControllerRenderProps } from "react-hook-form";
import { SignUp } from "../types/User";

export type inputType = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  field: ControllerRenderProps<SignUp, keyof SignUp>;
  displayError?: string;
  hasEye: boolean;
};

export const fields = [
  {
    name: "fullname",
    label: "Full Name",
    placeholder: "John Doe",
    rules: {
      required: "Full name is required",
      minLength: { value: 3, message: "Minimum 3 characters" },
      pattern: {
        value: /^[A-Za-z]+(?: [A-Za-z]+)+$/,
        message: "Invalid Full name",
      },
    },
  },
  {
    name: "email",
    label: "Email",
    placeholder: "example@gmail.com",
    rules: {
      required: "Email is required",
      pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
    },
  },
  {
    name: "password",
    label: "Password",
    placeholder: "*************",
    type: "password",
    rules: {
      required: "Password is required",
      minLength: { value: 8, message: "Minimum 8 characters" },
    },
  },
];

export const updateUser = {
  fullname: {
    required: "Fullname is required",
    minLength: { value: 3, message: "Minimum 3 characters" },
    pattern: {
      value: /^[A-Za-z]+(?: [A-Za-z]+)+$/,
      message: "Invalid Full name",
    },
  },
  email: {
    required: "Email is required",
    pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" },
  },

  password: {
    required: "Password is required",
    minLength: { value: 8, message: "Minimum 8 characters" },
  },
};

export type UpdateUserType = {
  fullname: string;
  email: string;
  password?: string;
};
