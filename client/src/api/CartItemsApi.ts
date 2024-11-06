import { getCookie } from "cookies-next";

export const getUserCart = async () => {
  const authorization = getCookie("authorization");
  try {
    const usersCart = await fetch(
      `${process.env.NEXT_PUBLIC_CART_ITEMS_API}/getCart` as string,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: authorization as string,
        },
      }
    );
    return usersCart.json();
  } catch (er) {
    console.log(er, "Error while fetching users cart");
  }
};
