import { getCookie } from "cookies-next";
import { CategoryType } from "../types/Category";

export const getCategories = async () => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_GETCATEGORIES_API as string,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  } catch (er) {
    console.log(er);
    throw er;
  }
};
export const getCategoryByid = async (id: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GETCATEGORIES_API}/${id}` as string,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return await response.json();
  } catch (er) {
    console.log(er);
    throw er;
  }
};
export const updateCategory = async (
  updateDTO: Partial<CategoryType>,
  id: string
) => {
  try {
    const token = getCookie("authorization");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_GETCATEGORIES_API}/${id}` as string,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: token as string,
        },
        body: JSON.stringify(updateDTO),
      }
    );
    return await response.json();
  } catch (er) {
    console.log(er);
    throw er;
  }
};
