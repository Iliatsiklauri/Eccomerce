import { getCookie } from "cookies-next";
import { Address } from "../types/Address";

export const createAddress = async ({
  id,
  createAddressDTO,
}: {
  id: string;
  createAddressDTO: Address;
}) => {
  const url = `${process.env.NEXT_PUBLIC_ADDRESS_API}/${id}`;
  try {
    const authorization = getCookie("authorization");
    const data = await fetch(url as string, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: authorization as string,
      },
      body: JSON.stringify(createAddressDTO),
    });
    const res = await data.json();
    return res;
  } catch (er) {
    console.log(er);
  }
};
export const updateAddress = async ({
  id,
  updateAddressDTO,
}: {
  id: number;
  updateAddressDTO: Partial<Address>;
}) => {
  const url = `${process.env.NEXT_PUBLIC_ADDRESS_API}/${id}`;
  try {
    const authorization = getCookie("authorization");
    const data = await fetch(url as string, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: authorization as string,
      },
      body: JSON.stringify(updateAddressDTO),
    });
    const res = await data.json();
    return res;
  } catch (er) {
    console.log(er);
  }
};
