import Image from "next/image";
import Link from "next/link";
import React from "react";
type propType = {
  id: number;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  mode: string | null;
  error: string | null;
};
export default function ApiInfoModal({ id, setModal, mode, error }: propType) {
  return (
    <div className="absolute w-full h-full flex items-center justify-center pr-60  z-20 ">
      <div className="modal-box z-10 w-[45%] max-w-[500px]  h-[220px] flex flex-col items-center justify-between pt-6">
        <>
          {error ? (
            <>
              <h1 className="text-white text-xl">Something went wrong</h1>
              <h1 className="text-xl text-red-500">Error:{error}</h1>
            </>
          ) : (
            <h1 className="text-xl text-white">
              Product {mode === "edit" ? "Updated" : "Created"} Successfully !
            </h1>
          )}
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
          <div className="w-full h-[40px]  flex justify-between">
            {error ? (
              <div
                className="h-full w-full flex items-center justify-center text-md text-white btn-error btn"
                onClick={() => setModal(false)}
              >
                Cancel
              </div>
            ) : (
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
            )}
          </div>
        </>
      </div>
    </div>
  );
}
