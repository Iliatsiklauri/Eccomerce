import { createProductType } from "@/src/types/Product";
import { createProductValidation } from "@/src/utils/CreateProductValidation";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
type PropType = {
  control: Control<createProductType>;
  errors: FieldErrors<createProductType>;
};
export default function DescTextArea({ control, errors }: PropType) {
  return (
    <Controller
      name="description"
      control={control}
      rules={createProductValidation.description}
      render={({ field }) => (
        <div className="w-full relative">
          <textarea
            {...field}
            className="textarea textarea-bordered w-full h-[130px] bg-slate-200 resize-none text-black"
            placeholder=""
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-xs bottom-[-12px] right-0 absolute">
              {errors?.description.message}
            </p>
          )}
        </div>
      )}
    />
  );
}
