import React, { InputHTMLAttributes } from "react";
import { FieldError } from "react-hook-form";

type PropType = {
  error?: FieldError;
  label: string;
  field: InputHTMLAttributes<HTMLInputElement>;
};

export default function ProductInput({ error, label, field }: PropType) {
  return (
    <section className="relative w-full h-[50px]">
      <p className="absolute text-black font-medium text-sm top-[-19px]">
        {label}
      </p>
      <input
        {...field}
        type="text"
        className={`w-full h-full bg-slate-200 pl-4 rounded-md focus:outline-none text-black ${
          error && "border-red-500 border-[1px]"
        } 
        `}
        placeholder={label === "New password" ? "Type a new password" : label}
      />

      {error && (
        <p className="text-red-500 text-xs bottom-[-16px] right-0 absolute">
          {error?.message}
        </p>
      )}
    </section>
  );
}
