import Image from "next/image";
import React from "react";
type PropType = {
  setAddAdmin: React.Dispatch<React.SetStateAction<boolean>>;
};
export default function UsersSectionHeader({ setAddAdmin }: PropType) {
  return (
    <div className="grid grid-cols-5 w-full bg-slate-300 p-4 rounded-xl border border-gray-300 font-bold text-black relative items-center">
      <div className="">ID</div>
      <div className="">Email</div>
      <div className="">Full Name</div>
      <div className="">Role</div>
      <div className="">Initial Admin</div>
      <div
        className="bg-darkBrown absolute h-[40px] rounded-lg gap-1 right-0 w-[100px] mr-2 text-white  flex items-center justify-center flex-row cursor-pointer"
        onClick={() => setAddAdmin(true)}
      >
        <p className="text-xs font-medium">Add admin</p>
        <Image
          src={"/icons/adminPanel/administrator-24.ico"}
          width={20}
          height={20}
          alt="admin"
        />
      </div>
    </div>
  );
}
