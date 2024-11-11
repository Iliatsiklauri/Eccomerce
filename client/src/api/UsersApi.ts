import { getCookie } from "cookies-next";
import { UpdateUserType } from "../utils/auth";

export const getUsersApi = async (token: string) => {
  try {
    const users = await fetch(process.env.NEXT_PUBLIC_GETUSERS_API as string, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: token,
      },
    });
    return users.json();
  } catch (er) {
    console.log("Error fetching users", er);
    throw er;
  }
};

export const getUserApi = async (id: string) => {
  try {
    const token = getCookie("authorization");
    const user = await fetch(
      `${process.env.NEXT_PUBLIC_GETUSERS_API}/${id}` as string,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: token as string,
        },
      }
    );
    return user.json();
  } catch (er) {
    console.log("Error fetching users", er);
    throw er;
  }
};

export const updateUserApi = async (id: string, updateUser: UpdateUserType) => {
  try {
    const token = getCookie("authorization");
    const res = await fetch(`${process.env.NEXT_PUBLIC_GETUSERS_API}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: token as string,
      },
      body: JSON.stringify(updateUser),
    });

    const createdProduct = await res.json();
    return createdProduct;
  } catch (er) {
    console.log(er, "error creating product");
  }
};

export const deleteUserApi = async (id: number) => {
  try {
    const token = getCookie("authorization");
    await fetch(`${process.env.NEXT_PUBLIC_GETUSERS_API}/${id}` as string, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: token as string,
      },
    });
    return;
  } catch (er) {
    console.log("Error deleting user", er);
    throw er;
  }
};
