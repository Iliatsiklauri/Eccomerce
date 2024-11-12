import { getCookie } from "cookies-next";

export const getUserOrders = async () => {
  const authorization = getCookie("authorization");
  try {
    const usersCart = await fetch(
      `${process.env.NEXT_PUBLIC_ORDERS_API}/user` as string,
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

export const addOrderById = async (products: number[], quantity: number) => {
  const payload = {
    IdArray: products,
    quantity,
  };
  const authorization = getCookie("authorization");
  try {
    const usersCart = await fetch(
      `${process.env.NEXT_PUBLIC_ORDERS_API}` as string,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: authorization as string,
        },
        body: JSON.stringify(payload),
      }
    );
    return usersCart.json();
  } catch (er) {
    console.log(er, "Error while fetching users cart");
  }
};

export const addOrderByCart = async () => {
  const authorization = getCookie("authorization");
  try {
    const usersCart = await fetch(
      `${process.env.NEXT_PUBLIC_ORDERS_API}/cart` as string,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: authorization as string,
        },
      }
    );
    const cart = await usersCart.json();
    console.log(cart);
    return cart;
  } catch (er) {
    console.log(er, "Error while fetching users cart");
  }
};
