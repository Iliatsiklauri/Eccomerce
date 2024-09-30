import React, { useState } from "react";
import AuthButton from "./AuthButton";
import { Controller, useForm } from "react-hook-form";
import { fields, SignIn, user } from "@/src/utils/auth";
import SingleInput from "./SingleInput";
import { signInUser } from "@/src/api/AuthApi";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { logIn } from "@/src/store/features/authSlice";

export default function SignInForm() {
  const [emailErr, setEmailErr] = useState("");
  const [passErr, setPassErr] = useState("");
  const dispatch = useDispatch();
  const Router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignIn>({
    defaultValues: { email: "", password: "" },
  });

  const handleFormSubmition = async (formData: SignIn) => {
    const res = await signInUser(formData);

    if (res.status > 299 && res.error) {
      switch (res.status) {
        case 401:
          setEmailErr("");
          setPassErr(res.error.message);
          break;
        case 404:
          setPassErr("");
          setEmailErr(res.error.message);
          break;
        default: {
          setPassErr("An unexpected error occurred");
          break;
        }
      }
      return;
    }
    const user: user = jwtDecode(res.success?.token);
    dispatch(
      logIn({ email: user.email, role: user.role, fullname: user.fullname })
    );

    setCookie("authorization", res.success?.token, {
      path: "/",
      maxAge: 7200,
      httpOnly: false,
    });
    if (user.role === "ADMIN") {
      return Router.push("/admin/Dashboard");
    }
    Router.push("/");
  };

  return (
    <form
      className="w-full flex flex-col gap-10"
      onSubmit={handleSubmit(handleFormSubmition)}
    >
      <div className="flex flex-col gap-3">
        {fields.slice(-2).map((el, key) => (
          <Controller
            name={el.name as keyof SignIn}
            key={key}
            rules={el.rules}
            control={control}
            render={({ field }) => (
              <section className="relative">
                <SingleInput
                  name={el.name}
                  label={el.label}
                  type={el.type}
                  placeholder={el.placeholder}
                  hasEye={el.name === "password"}
                  field={field}
                  displayError={
                    el.name === "email" && emailErr
                      ? emailErr
                      : el.name === "password" && passErr
                      ? passErr
                      : errors[field.name]?.message
                  }
                />
              </section>
            )}
          />
        ))}
      </div>
      <AuthButton title="Sign in" />
    </form>
  );
}
