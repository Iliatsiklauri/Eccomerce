import React, { useState } from "react";
import AuthButton from "./AuthButton";
import { useForm, Controller } from "react-hook-form";
import { fields, SignUp, user } from "@/src/utils/auth";
import SingleInput from "./SingleInput";
import { signUpUser } from "@/src/api/AuthApi";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { logIn } from "@/src/store/features/authSlice";
export default function SignUpForm() {
  const [emailErr, setEmailErr] = useState("");
  const Router = useRouter();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<SignUp>({
    defaultValues: { email: "", fullname: "", password: "" },
  });

  const handleFormSubmition = async (formData: SignUp) => {
    const res = await signUpUser(formData);

    if (res.status > 299 && res.error) {
      return setEmailErr(res.error.message);
    }

    setCookie("authorization", res.success?.token, {
      path: "/",
      maxAge: 7200,
      httpOnly: false,
    });

    const user: user = jwtDecode(res.success?.token);

    dispatch(
      logIn({ email: user.email, role: user.role, fullname: user.fullname })
    );

    Router.push("/");
  };
  return (
    <form
      className="w-full flex flex-col gap-10"
      onSubmit={handleSubmit(handleFormSubmition)}
    >
      <div className="flex flex-col gap-3">
        {fields.map((el, key) => (
          <Controller
            name={el.name as keyof SignUp}
            key={key}
            rules={el.rules}
            control={control}
            render={({ field }) => (
              <section className="relative">
                <SingleInput
                  name={el.name}
                  label={el.label}
                  type={el.type}
                  hasEye={el.name === "password"}
                  placeholder={el.placeholder}
                  field={field}
                  displayError={
                    el.name === "email" && emailErr
                      ? emailErr
                      : errors[field.name]?.message
                  }
                />
              </section>
            )}
          />
        ))}
      </div>
      <AuthButton title="Sign up" />
    </form>
  );
}
