import Image from "next/image";
import React from "react";

type PropType = {
  error: string | null;
};

export default function ErrorOrSuccImage({ error }: PropType) {
  return (
    <>
      {error ? (
        <Image
          src={"/icons/adminPanel/close.png"}
          width={40}
          height={30}
          alt="success"
        />
      ) : (
        <Image
          src={"/icons/adminPanel/check.png"}
          width={40}
          height={30}
          alt="success"
        />
      )}
    </>
  );
}
