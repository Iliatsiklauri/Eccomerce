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

export const deleteItemFromCart = async (id: number) => {
  const authorization = getCookie("authorization");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CART_ITEMS_API}/${id}` as string,
      {
        method: "DELETE",
        headers: {
          authorization: authorization as string,
        },
      }
    );
    return res.json();
  } catch (er) {
    console.log(er, "Error while deleting item from cart");
  }
};

export const addItemToCart = async (id: number, quantity: number) => {
  const authorization = getCookie("authorization");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CART_ITEMS_API}/${id}` as string,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: authorization as string,
        },
        body: JSON.stringify({ quantity }),
      }
    );
    return res.json();
  } catch (er) {
    console.log(er, "Error while adding item to cart");
  }
};

export const updateCartItem = async (id: number, quantity: number) => {
  const authorization = getCookie("authorization");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CART_ITEMS_API}/${id}` as string,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: authorization as string,
        },
        body: JSON.stringify({ quantity }),
      }
    );
    return res.json();
  } catch (er) {
    console.log(er, "Error while adding item to cart");
  }
};
