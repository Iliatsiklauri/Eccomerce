"use client";
import UsersSectionHeader from "./UsersSectionHeader";
import UsersList from "./UsersList";
import SignUpForm from "@/src/components/Shared/Auth/SignUpForm";
import { useState } from "react";

export default function UsersSection() {
  const [addAdmin, setAddAdmin] = useState(false);

  return (
    <div className="w-full h-full bg-white rounded-xl p-4 flex flex-col items-center justify-start gap-8 shadow-md shadow-stone-500 overflow-y-auto">
      <UsersSectionHeader setAddAdmin={setAddAdmin} />
      <UsersList />
      {addAdmin && (
        <div className="w-full h-full absolute left-0 top-0 flex items-center justify-center z-50">
          <div
            className="w-full h-full absolute left-0 top-0 bg-black bg-opacity-45"
            onClick={() => setAddAdmin(false)}
          ></div>
          <div className="bg-white w-[400px] p-5 rounded-xl z-50">
            <SignUpForm addAdmin />
          </div>
        </div>
      )}
    </div>
  );
}
