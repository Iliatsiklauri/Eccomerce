import { getCookie } from "cookies-next";
import { Order, orderStatus } from "../types/Order";

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

export const getAllOrders = async ({
  page,
  status,
}: {
  page: number;
  status: undefined | orderStatus;
}): Promise<
  | {
      products: Order[];
      total: number;
    }
  | undefined
> => {
  const authorization = getCookie("authorization");
  try {
    const statusParam = status ? `&status=${status}` : "";
    const usersCart = await fetch(
      `${process.env.NEXT_PUBLIC_ORDERS_API}?page=${page}${statusParam}`,
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

export const addOrderById = async (product: number, quantity: number) => {
  const payload = {
    productId: product,
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
    return cart;
  } catch (er) {
    console.log(er, "Error while fetching users cart");
  }
};

export const updateOrder = async (status: orderStatus, id: number) => {
  const authorization = getCookie("authorization");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_ORDERS_API}/${id}` as string,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: authorization as string,
        },
        body: JSON.stringify({ orderStatus: status }),
      }
    );
    const updatedOrder = await res.json();
    return updatedOrder;
  } catch (er) {
    console.log(er, "Error while fetching users cart");
  }
};
