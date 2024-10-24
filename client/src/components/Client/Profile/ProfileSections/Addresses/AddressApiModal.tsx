import ErrorOrSuccImage from "@/src/components/Admin/RightPanel/AdminSections/Products/CreateProduct/ApiInfoModal/ErrorOrSuccImage";
import React from "react";

type PropType = {
  loading: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  res: {
    status: number;
    success?: {
      message: string;
    };
    error?: {
      message: string;
    };
  } | null;
};

export default function AddressApiModal({ loading, setModal, res }: PropType) {
  return (
    <div className="w-fulll h-full absolute right-0 top-0 left-0 bottom-0 flex items-start justify-center">
      <div
        className="w-full h-full bg-black absolute bg-opacity-15 z-20"
        onClick={() => setModal(false)}
      ></div>
      <div className="w-1/3 h-1/3 z-30 bg-white mt-[7%] modal-box flex items-center justify-center p-3 gap-4 flex-col">
        {loading ? (
          <div className="flex items-center justify-center flex-col gap-10">
            <h1 className="text-2xl text-white">Please Wait</h1>
            <div className="spinner"></div>
          </div>
        ) : (
          <h1 className="text-black text-2xl">
            {res?.error ? res.error.message : res?.success?.message}
          </h1>
        )}
        <div>
          {res?.error?.message ? (
            <ErrorOrSuccImage error={res?.error?.message} />
          ) : (
            <ErrorOrSuccImage error={null} />
          )}
        </div>
      </div>
    </div>
  );
}
