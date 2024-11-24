import { getCookie } from "cookies-next";

export const getAllmessages = async (userId: number) => {
  try {
    const authorization = getCookie("authorization");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_MESSAGES_API}/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: authorization as string,
        },
      }
    );

    return res.json();
  } catch (er) {
    console.log(er, "Error while fetching messages");
    return null;
  }
};

export const getAllUsersFromMessages = async () => {
  try {
    const authorization = getCookie("authorization");
    const res = await fetch(`${process.env.NEXT_PUBLIC_MESSAGES_API}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: authorization as string,
      },
    });

    return res.json();
  } catch (er) {
    console.log(er, "Error while fetching messages");
    return null;
  }
};
