import { userType } from "@/src/store/features/usersSlice";
import React from "react";

export default function EditUser({ el }: { el: userType }) {
  return (
    <div className="w-full flex flex-col">
      <form className="w-full flex flex-col gap-5">
        <label className="input input-bordered flex items-center gap-2">
          Fullname
          <input type="text" className="grow" placeholder={`${el.fullname}`} />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Role
          <input type="text" className="grow" placeholder={`${el.role}`} />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Email
          <input type="text" className="grow" placeholder={`${el.email}`} />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Password
          <input
            type="text"
            className="grow placeholder:text-xs"
            placeholder={`${el.password}`}
            disabled
          />
        </label>
      </form>
    </div>
  );
}
