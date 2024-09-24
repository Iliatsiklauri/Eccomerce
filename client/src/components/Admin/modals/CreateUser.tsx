import React from "react";
type CreateModal = {
  createModalRef: React.RefObject<HTMLDialogElement>;
};
export default function CreateUser({ createModalRef }: CreateModal) {
  return (
    <dialog className="modal-box w-[600px] h-[700px]" ref={createModalRef}>
      <div className="w-full h-full flex items-center justify-center relative">
        <div className="w-full flex items-center justify-between gap-5">
          <div
            className="btn w-[47%] bg-gray-800"
            onClick={() => createModalRef.current?.close()}
          >
            CANCEL
          </div>
          <div className="btn w-[47%] btn-success">CREATE</div>
        </div>
      </div>
    </dialog>
  );
}
