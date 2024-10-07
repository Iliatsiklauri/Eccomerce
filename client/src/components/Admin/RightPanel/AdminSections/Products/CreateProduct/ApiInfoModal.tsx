import Link from "next/link";
import React from "react";
type propType = {
  id: number;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  success: boolean;
};
export default function ApiInfoModal({ id, setSuccess, success }: propType) {
  return (
    <div className="absolute w-full h-full flex items-center justify-center pr-40">
      <div className="modal-box z-10 w-[30%] h-1/4 flex flex-col items-center justify-between pt-10">
        {success && (
          <>
            <h1 className="text-xl text-white ">
              Product Created Successfully !
            </h1>
            <div className="w-full h-[40%]  flex justify-between">
              <div
                className="h-full w-[45%]  rounded-xl btn text-white text-lg btn-neutral"
                onClick={() => setSuccess(false)}
              >
                Cancel
              </div>
              <Link
                href={`/products/${id}`}
                className="h-full w-[45%] text-white text-lg rounded-xl btn btn-success"
              >
                View Product
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
