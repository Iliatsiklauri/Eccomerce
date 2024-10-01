import { createProductType } from "@/src/types/Product";
import React from "react";
import { Control, Controller } from "react-hook-form";
type PropType = {
  control: Control<createProductType>;
};
export default function PinnedCheck({ control }: PropType) {
  return (
    <Controller
      name="pinned"
      control={control}
      render={({ field }) => (
        <label
          htmlFor="pinned"
          className="text-xl text-black font-medium w-[250px] bg-slate-200 h-[50px] flex items-center justify-between rounded-md px-4 cursor-pointer font-sans"
        >
          Pinned
          <input
            type="checkbox"
            id="pinned"
            className="checkbox bg-white checkbox-success border-none"
            checked={field.value}
            onChange={(e) => field.onChange(e.target.checked)}
            ref={field.ref}
          />
        </label>
      )}
    />
  );
}
