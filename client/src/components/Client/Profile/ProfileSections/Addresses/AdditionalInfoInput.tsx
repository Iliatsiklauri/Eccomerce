import { Address } from "@/src/types/Address";
import React from "react";
import { ControllerRenderProps, FieldError } from "react-hook-form";
type PropType = {
  error?: FieldError | undefined;
  label: string;
  field: ControllerRenderProps<Address, "additionalInfo">;
};

export default function AdditionalInfoInput({ error, label, field }: PropType) {
  return (
    <div className="w-full relative flex items-start justify-center flex-col ">
      <p className="text-black text-sm font-medium">{label}</p>
      <textarea
        {...field}
        className={`textarea focus:outline-none w-full h-[130px] bg-slate-200 resize-none text-black ${
          error?.message && "border-red-500 border-[1px] focus:border-red-500"
        }`}
      ></textarea>
      {error?.message && (
        <p className="text-red-500 text-xs bottom-[-17px] right-0 absolute">
          {error?.message}
        </p>
      )}
    </div>
  );
}
