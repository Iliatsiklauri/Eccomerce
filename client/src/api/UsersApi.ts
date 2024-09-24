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
