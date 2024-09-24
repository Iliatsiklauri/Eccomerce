import { SignIn, SignUp } from "../utils/auth";

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
    console.log("error", er);
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
    console.log("error", er);
    throw er;
  }
};
