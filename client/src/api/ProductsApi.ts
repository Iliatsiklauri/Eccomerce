type fetchProductsType = {
  category?: string | null;
};

export const fetchProducts = async () => {
  try {
    const data1 = await fetch(
      process.env.NEXT_PUBLIC_GETPRODUCTS_API as string,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await data1.json();
    return res;
  } catch (er) {
    console.log(er);
  }
};
