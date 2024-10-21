import React from "react";
import SuccessButtons from "./SuccessButtons";

type PropType = {
  id: number;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
};

export default function ButtonsForModalOptions({
  id,
  setModal,
  error,
}: PropType) {
  return (
    <div className="w-full h-[40px]  flex justify-between">
      {error ? (
        <div
          className="h-full w-full flex items-center justify-center text-md text-white btn-error btn"
          onClick={() => setModal(false)}
        >
          Cancel
        </div>
      ) : (
        <SuccessButtons setModal={setModal} id={id} />
      )}
    </div>
  );
}
