import { getCookie } from "cookies-next";
import { SignIn, SignUp } from "../types/User";

export const signUpUser = async (data: SignUp) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_SIGNUP_API as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (er) {
    console.log(er);
    throw er;
  }
};

export const signInUser = async (data: SignIn) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_SIGNIN_API as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (er) {
    console.log(er);
    throw er;
  }
};

export const addAdminApi = async (data: SignUp) => {
  const token = getCookie("authorization");
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_ADMIN_API as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: token as string,
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (er) {
    console.log(er);
    throw er;
  }
};
