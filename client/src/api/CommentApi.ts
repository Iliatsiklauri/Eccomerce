import { getCookie } from "cookies-next";

export const createComment = async ({
  id,
  content,
}: {
  id: string;
  content: string;
}) => {
  const url = `${process.env.NEXT_PUBLIC_COMMENTS_API}/${id}`;
  try {
    const authorization = getCookie("authorization");
    const data = await fetch(url as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: authorization as string,
      },
      body: JSON.stringify({ content }),
    });
    const res = await data.json();
    return res;
  } catch (er) {
    console.log(er);
  }
};
export const deleteComment = async ({ id }: { id: number }) => {
  const url = `${process.env.NEXT_PUBLIC_COMMENTS_API}/${id}`;
  try {
    const authorization = getCookie("authorization");
    const data = await fetch(url as string, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: authorization as string,
      },
    });
    const res = await data.json();
    return res;
  } catch (er) {
    console.log(er);
  }
};
