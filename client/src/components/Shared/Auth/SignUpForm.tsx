import React, { useState } from "react";
import AuthButton from "./AuthButton";
import { useForm, Controller } from "react-hook-form";
import { fields } from "@/src/utils/auth";
import SingleInput from "./SingleInput";
import { addAdminApi, signUpUser } from "@/src/api/AuthApi";
import { getCookie, setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { logIn } from "@/src/store/features/authSlice";
import { SignUp, user } from "@/src/types/User";
import Image from "next/image";
import { getUsersApi } from "@/src/api/UsersApi";
import { setUsers } from "@/src/store/features/usersSlice";

type PropType = {
  addAdmin?: boolean;
};

export default function SignUpForm({ addAdmin }: PropType) {
  const [emailErr, setEmailErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);
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
    setLoading(true);
    let res;
    if (addAdmin) {
      res = await addAdminApi(formData);
      const token = getCookie("authorization");
      const users = await getUsersApi(token as string);
      dispatch(setUsers(users));
    } else {
      res = await signUpUser(formData);
    }
    setLoading(false);
    setComplete(true);

    if (res.status > 299 && res.error) {
      return setEmailErr(res.error.message);
    }

    if (!addAdmin) {
      setCookie("authorization", res.success?.token, {
        path: "/",
        maxAge: 7200,
        httpOnly: false,
      });

      const user: user = jwtDecode(res.success?.token);

      dispatch(
        logIn({
          email: user.email,
          role: user.role,
          fullname: user.fullname,
          id: user.id,
        })
      );

      Router.push("/");
    }
  };
  if (addAdmin && (loading || complete)) {
    return (
      <div className="w-full h-[360px] bg-white flex items-center justify-center">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <div className="text-3xl text-white flex flex-col items-center justify-center gap-10">
            <p className="text-black">Admin added successfully !</p>
            <Image
              width={50}
              height={50}
              alt="Success"
              src={"/icons/adminPanel/check.png"}
            />
          </div>
        )}
      </div>
    );
  }
  return (
    <form
      className={` w-full flex flex-col  ${addAdmin ? "gap-6" : "gap-10"}`}
      onSubmit={handleSubmit(handleFormSubmition)}
    >
      {addAdmin && (
        <div className="w-full flex items-center justify-center gap-4">
          <h1 className="text-2xl text-black text-center font-semibold font-sans">
            Add admin
          </h1>
          <Image
            src={"/icons/adminPanel/manager.png"}
            width={30}
            height={30}
            alt="admin"
          />
        </div>
      )}

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
      <AuthButton title={addAdmin ? "Add admin" : "Sign Up"} />
    </form>
  );
}
