import React from "react";

export default function UsersSectionHeader() {
  return (
    <div className="grid grid-cols-5 w-full bg-slate-300 p-4 rounded-xl border border-gray-300 font-bold text-black">
      <div className="">ID</div>
      <div className="">Email</div>
      <div className="">Full Name</div>
      <div className="">Role</div>
      <div className="">Initial Admin</div>
    </div>
  );
}
