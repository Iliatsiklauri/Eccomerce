import { CreateProductType, Product } from "@/src/types/Product";
import { createProductValidation } from "@/src/utils/CreateProductValidation";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";

type PropType = {
  errors: FieldErrors<CreateProductType>;
  control: Control<CreateProductType>;
  setImageForPrev: React.Dispatch<React.SetStateAction<string | null | File>>;
  product: Product | null;
};

export default function FormFiles({
  product,
  errors,
  control,
  setImageForPrev,
}: PropType) {
  return (
    <div className="flex items-center justify-center flex-col w-1/2 gap-7">
      <div className="w-full relative h-[50px]">
        <p className="absolute text-black font-medium text-sm top-[-19px]">
          Image
        </p>
        <Controller
          name="image"
          control={control}
          rules={product ? undefined : createProductValidation.image}
          render={({ field: { onChange } }) => (
            <input
              type="file"
              className={`w-full h-full rounded-md file-input file-input-bordered bg-slate-200 text-black focus:outline-none ${
                errors.image ? "border-red-500" : ""
              }`}
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setImageForPrev(file);
                onChange(file);
              }}
            />
          )}
        />
        {errors.image && (
          <p className="text-red-500 text-sm bottom-[-19px] right-0 absolute">
            {errors.image.message}
          </p>
        )}
      </div>

      <div className="w-full relative h-[50px]">
        <p className="absolute text-black font-medium text-sm top-[-19px]">
          Pinned Image
        </p>
        <Controller
          name="pinnedImage"
          control={control}
          rules={product ? undefined : createProductValidation.pinnedImage}
          render={({ field: { onChange } }) => (
            <input
              type="file"
              className={`w-full h-full rounded-md file-input file-input-bordered bg-slate-200 text-black focus:outline-none ${
                errors.pinnedImage ? "border-red-500" : ""
              }`}
              onChange={(e) => {
                const file = e.target.files?.[0] || null;

                onChange(file);
              }}
            />
          )}
        />
        {errors.pinnedImage && (
          <p className="text-red-500 text-sm bottom-[-19px] right-0 absolute">
            {errors.pinnedImage.message}
          </p>
        )}
      </div>
    </div>
  );
}
