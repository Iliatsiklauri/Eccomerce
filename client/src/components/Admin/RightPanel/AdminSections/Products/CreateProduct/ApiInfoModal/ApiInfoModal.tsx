import React from "react";
import ErrorOrSuccImage from "./ErrorOrSuccImage";
import ButtonsForModalOptions from "./ButtonsForModalOptions";
import SuccOrErrMessage from "./SuccOrErrMessage";
type propType = {
  id: number;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  mode: string | null;
  error: string | null;
  loading: boolean;
};
export default function ApiInfoModal({
  id,
  setModal,
  mode,
  error,
  loading,
}: propType) {
  return (
    <div className="absolute w-full h-full flex items-center justify-center pr-60  z-20 ">
      <div className="modal-box z-10 w-[45%] max-w-[500px]  h-[220px] flex flex-col items-center justify-between pt-6">
        <>
          {loading ? (
            <div className="flex items-center justify-center flex-col gap-10">
              <h1 className="text-2xl text-white">Please Wait</h1>
              <div className="spinner"></div>
            </div>
          ) : (
            <>
              <SuccOrErrMessage error={error} mode={mode} />
              <ErrorOrSuccImage error={error} />
              <ButtonsForModalOptions
                error={error}
                id={id}
                setModal={setModal}
              />
            </>
          )}
        </>
      </div>
    </div>
  );
}
