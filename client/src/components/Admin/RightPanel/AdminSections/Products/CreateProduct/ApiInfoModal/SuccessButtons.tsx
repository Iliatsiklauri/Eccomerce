import Link from "next/link";
import React from "react";

type PropType = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
};

export default function SuccessButtons({ setModal, id }: PropType) {
  return (
    <>
      <div
        className="h-full w-[47%]  rounded-xl btn text-white text-md btn-neutral"
        onClick={() => setModal(false)}
      >
        Cancel
      </div>
      <Link
        href={`/products/${id}`}
        className="h-full w-[47%] text-white text-md rounded-xl btn btn-success"
      >
        View Product
      </Link>
    </>
  );
}
