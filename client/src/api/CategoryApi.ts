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
