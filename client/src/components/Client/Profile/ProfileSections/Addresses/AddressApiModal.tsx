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
  dif?: boolean;
};

export default function AddressApiModal({
  loading,
  setModal,
  res,
  dif,
}: PropType) {
  return (
    <div
      className={`w-full h-full absolute right-0 top-0 left-0 bottom-0 flex ${
        dif ? "items-center" : "items-start"
      }  justify-center `}
    >
      <div
        className="w-full h-full bg-black absolute bg-opacity-10 z-20"
        onClick={() => setModal(false)}
      ></div>
      <div
        className={`w-[20%] min-w-[300px] h-[20%] z-30 bg-white ${
          dif ? "ml-[5%]" : "mt-[12%]"
        } modal-box flex items-center justify-center p-3 gap-4 flex-col`}
      >
        {loading ? (
          <div className="flex items-center justify-center flex-col gap-10">
            <h1 className="text-2xl text-black">Please Wait</h1>
            <div className="spinner"></div>
          </div>
        ) : (
          <h1 className="text-black text-2xl">
            {res?.error
              ? res.error.message
              : res?.success?.message
              ? res.success.message
              : "Something went wrong"}
          </h1>
        )}
        <div>
          {res?.error?.message ? (
            <ErrorOrSuccImage error={res?.error?.message} />
          ) : !loading ? (
            <ErrorOrSuccImage error={null} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
