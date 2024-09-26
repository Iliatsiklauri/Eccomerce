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
