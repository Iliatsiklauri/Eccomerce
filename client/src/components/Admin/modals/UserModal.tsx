import { userType } from "@/src/store/features/usersSlice";
import React from "react";
import EditUser from "./EditUser";
import { deleteUserApi } from "@/src/api/UsersApi";

type propType = {
  UserModalRef: React.RefObject<HTMLDialogElement>;
  el: userType;
  modalType: string;
};

export default function UserModal({ UserModalRef, el, modalType }: propType) {
  return (
    <dialog className="modal-box" ref={UserModalRef}>
      <div className="w-full h-full flex items-center justify-between flex-col gap-10">
        {modalType === "DELETE" ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="text-2xl">
              Delete {el.fullname}&apos;s Account ?
            </div>
            <p className="text-lg">
              <span className="text-red-400 text-xl">NOTE : </span> You cant
              Reverse this action !
            </p>
          </div>
        ) : (
          <EditUser el={el} />
        )}
        <div className="w-full gap-4 flex">
          <button
            className="flex-1 btn bg-gray-800 text-white"
            onClick={() => {
              UserModalRef.current?.close();
            }}
          >
            CANCEL
          </button>
          <button
            className={`flex-1 btn ${
              modalType == "DELETE" ? "bg-red-600" : "btn-success"
            } text-white `}
            onClick={async () => {
              await deleteUserApi(el.id);
            }}
          >
            {modalType === "EDIT" ? "SAVE" : modalType}
          </button>
        </div>
      </div>
    </dialog>
  );
}
