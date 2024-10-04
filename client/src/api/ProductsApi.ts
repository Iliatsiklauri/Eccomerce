import { getCookie } from "cookies-next";
import { createProductType, Product } from "../types/Product";

export const fetchProducts = async ({ pinned }: { pinned: boolean | null }) => {
  const url = pinned
    ? `${process.env.NEXT_PUBLIC_GETPRODUCTS_API}/?pinned=true`
    : process.env.NEXT_PUBLIC_GETPRODUCTS_API;
  try {
    const data1 = await fetch(url as string, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const res = await data1.json();
    return res;
  } catch (er) {
    console.log(er);
  }
};

export const fetchProductsByCategory = async ({
  category,
  pinned,
  page,
}: {
  category: number;
  pinned: boolean;
  page?: number;
}) => {
  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_GETPRODUCTS_API as string
      }/?category=${category}&pinned=${pinned}&page=${page}` as string,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  } catch (er) {
    console.log(er);
  }
};

export const getProductById = async (id: string): Promise<Product | null> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_GETPRODUCTS_API}/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const product = await res.json();
    return product;
  } catch (er) {
    console.log("error while fetching single product");
    return null;
  }
};

export const createProduct = async (createProduct: createProductType) => {
  try {
    const formData = new FormData();
    Object.keys(createProduct).forEach((key) => {
      const value = createProduct[key];
      if (value !== null && value !== undefined) {
        formData.append(key, value as string | File);
      }
    });

    const token = getCookie("authorization");
    const res = await fetch(`${process.env.NEXT_PUBLIC_GETPRODUCTS_API}`, {
      method: "POST",
      headers: {
        authorization: token as string,
      },
      body: formData,
    });
    const createdProduct = await res.json();
    return createdProduct;
  } catch (er) {
    console.log(er, "error creating product");
  }
};
