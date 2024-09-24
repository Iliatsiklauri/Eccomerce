import { inputType } from "@/src/utils/auth";
import Image from "next/image";
import React, { useState } from "react";

export default function SingleInput({
  label,
  name,
  placeholder,
  type,
  field,
  displayError,
  hasEye,
}: inputType) {
  const [eyeMode, setEyeMode] = useState(false);
  return (
    <section className="relative">
      <label htmlFor={name} className="text-black text-[13px]">
        {label}
        <span className="text-red-500"> *</span>
      </label>
      <input
        {...field}
        type={
          hasEye && type === "password" ? (eyeMode ? "text" : "password") : type
        }
        id={name}
        className={` w-full h-[46px] bg-slate-200 rounded-lg px-4 text-black text-[14px] placeholder:text-[13px] ${
          displayError && "outline-red-500"
        }`}
        placeholder={placeholder}
      />
      {hasEye && (
        <Image
          alt="eyes"
          src={`/icons/${!eyeMode ? "hide.png" : "view.png"}`}
          width={18}
          height={18}
          onClick={() => {
            if (setEyeMode) setEyeMode(!eyeMode);
          }}
          className="cursor-pointer absolute  top-9 right-5 opacity-70"
        />
      )}
      {displayError && (
        <p className="text-red-500 text-[13px] absolute right-0">
          {displayError}
        </p>
      )}
    </section>
  );
}
