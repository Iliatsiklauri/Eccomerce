import { userType } from "@/src/store/features/usersSlice";
import Image from "next/image";
import React, { useRef, useState } from "react";
import UserInfoAction from "./UserInfoAction";
import UserModal from "@/src/components/Admin/modals/UserModal";

type PropType = {
  el: userType;
  userInfo: null | number;
  setUserInfo: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function SingleUserSection({
  el,
  userInfo,
  setUserInfo,
}: PropType) {
  const [modalType, setModalType] = useState("");
  const UserModalRef = useRef<HTMLDialogElement>(null);
  return (
    <div className="w-full">
      <UserModal UserModalRef={UserModalRef} el={el} modalType={modalType} />
      <div
        className={`grid grid-cols-5 p-2 rounded-xl border border-gray-300 w-full relative shadow-sm shadow-stone-300 text-black`}
      >
        <div>{el.id}</div>
        <div>{el.email}</div>
        <div className="hover:underline cursor-pointer">{el.fullname}</div>
        <div>{el.role}</div>
        <div>{el.initialAdmin ? "True" : "False"}</div>
        <div className="absolute right-4 cursor-pointer top-2">
          <div className="relative">
            <Image
              alt="more"
              src={"/icons/adminPanel/more.png"}
              width={20}
              height={20}
              className=""
              onClick={() => setUserInfo(userInfo === el.id ? null : el.id)}
            />
            {el.id === userInfo && (
              <UserInfoAction
                setModalType={setModalType}
                setUserInfo={setUserInfo}
                UserModalRef={UserModalRef}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
