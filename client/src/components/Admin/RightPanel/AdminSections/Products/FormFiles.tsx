import { createProductType } from "@/src/types/Product";
import { createProductValidation } from "@/src/utils/CreateProductValidation";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
type PropType = {
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;
  control: Control<createProductType>;
  errors: FieldErrors<createProductType>;
};
export default function FormFiles({
  control,
  errors,
  setSelectedImage,
}: PropType) {
  return (
    <div className="flex items-center justify-center flex-col w-1/2 gap-7">
      <Controller
        name="image"
        control={control}
        rules={createProductValidation.image}
        render={({ field: { onChange } }) => (
          <div className="w-full relative h-[50px]">
            <input
              type="file"
              className={`w-full h-full rounded-md file-input file-input-bordered bg-slate-200 text-black focus:outline-none ${
                errors.image && "border-red-500"
              }`}
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setSelectedImage(file);
                onChange(file);
              }}
            />
            {errors.image && (
              <p className="text-red-500 text-sm bottom-[-19px] right-0 absolute">
                {errors?.image.message}
              </p>
            )}
          </div>
        )}
      />
      <Controller
        name="pinnedImage"
        control={control}
        rules={createProductValidation.pinnedImage}
        render={({ field: { onChange } }) => (
          <div className="w-full relative h-[50px]">
            <input
              type="file"
              className={`w-full h-full rounded-md file-input file-input-bordered bg-slate-200 text-black focus:outline-none ${
                errors.image && "border-red-500"
              }`}
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                onChange(file);
              }}
            />
            {errors.pinnedImage && (
              <p className="text-red-500 text-sm bottom-[-19px] right-0 absolute">
                {errors?.pinnedImage.message}
              </p>
            )}
          </div>
        )}
      />
    </div>
  );
}
