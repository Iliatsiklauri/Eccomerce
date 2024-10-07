import { createProductType } from "@/src/types/Product";
import { createProductValidation } from "@/src/utils/CreateProductValidation";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
type PropType = {
  control: Control<createProductType>;
  errors: FieldErrors<createProductType>;
  description: string;
};
export default function DescTextArea({
  control,
  errors,
  description,
}: PropType) {
  return (
    <Controller
      name="description"
      control={control}
      rules={createProductValidation.description}
      render={({ field }) => (
        <div className="w-full relative flex items-end justify-center flex-col ">
          <p
            className={`${
              description.length > 300 && "text-red-500"
            } justify-self-end absolute top-[-20px] text-sm`}
          >
            {description.length}/300
          </p>
          <textarea
            {...field}
            className={`textarea focus:outline-none w-full h-[130px] bg-slate-200 resize-none text-black ${
              errors.description &&
              "border-red-500 border-[1px] focus:border-red-500"
            }`}
            placeholder=""
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-xs bottom-[-17px] right-0 absolute">
              {errors?.description.message}
            </p>
          )}
        </div>
      )}
    />
  );
}
