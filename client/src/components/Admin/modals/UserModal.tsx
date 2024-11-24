import { setUsers, userType } from "@/src/store/features/usersSlice";
import React, { useState } from "react";
import { deleteUserApi, getUsersApi } from "@/src/api/UsersApi";
import { getCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import Image from "next/image";

type propType = {
  el: userType;
  setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function UserModal({ el, setDeleteModal }: propType) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [userDeleted, setUserDeleted] = useState(false);
  return (
    <div className="w-full h-full absolute  top-0 left-0 flex items-center justify-center z-10">
      <div
        className="w-full h-full absolute bg-black bg-opacity-50"
        onClick={() => {
          setDeleteModal(false);
          setUserDeleted(false);
        }}
      ></div>
      <div
        className={`w-[400px] h-[200px] text-white p-5 rounded-xl bg-slate-600 z-20 ${
          (loading || userDeleted) && "flex items-center justify-center"
        }`}
      >
        {loading ? (
          <div className="spinner"></div>
        ) : userDeleted ? (
          <div className="text-2xl text-white flex flex-col items-center justify-center gap-3">
            <p>User deleted successfully !</p>
            <Image
              width={40}
              height={40}
              alt="Success"
              src={"/icons/adminPanel/check.png"}
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-between flex-col gap-10">
            <div className="flex flex-col items-center justify-center gap-4">
              <div className="text-2xl">
                Delete {el.fullname}&apos;s Account ?
              </div>
              <p className="text-lg">
                <span className="text-red-400 text-xl">NOTE : </span> You cant
                Reverse this action !
              </p>
            </div>

            <div className="w-full gap-4 flex">
              <button
                className="flex-1 btn bg-gray-800 text-white"
                onClick={() => setDeleteModal(false)}
              >
                CANCEL
              </button>
              <button
                className={`flex-1 btn bg-red-600 text-white `}
                onClick={async () => {
                  setLoading(true);
                  await deleteUserApi(el.id);
                  setLoading(false);
                  setUserDeleted(true);
                  const token = getCookie("authorization");
                  const users = await getUsersApi(token as string);
                  dispatch(setUsers(users));
                }}
              >
                DELETE
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
