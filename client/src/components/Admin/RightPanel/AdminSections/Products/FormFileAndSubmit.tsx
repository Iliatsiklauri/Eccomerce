import { createProductType } from "@/src/types/Product";
import { createProductValidation } from "@/src/utils/CreateProductValidation";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
type PropType = {
  selectedImage: File | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;
  control: Control<createProductType>;
  errors: FieldErrors<createProductType>;
};
export default function FormFileAndSubmit({
  selectedImage,
  setSelectedImage,
  control,
  errors,
}: PropType) {
  return (
    <div className="flex items-center justify-between w-full h-[60px] absolute bottom-10 right-0 pl-6">
      <Controller
        name="image"
        control={control}
        rules={createProductValidation.image}
        render={({ field: { onChange } }) => (
          <div className="w-[47%] relative h-full">
            <input
              type="file"
              className="w-full h-full rounded-md file-input file-input-bordered bg-slate-200 text-black"
              onChange={(e) => {
                const file = e.target.files?.[0] || null;
                setSelectedImage(file);
                onChange(file);
              }}
            />
            {errors.image && (
              <p className="text-red-500 text-sm bottom-[-17px] right-0 absolute">
                {errors?.image.message}
              </p>
            )}
          </div>
        )}
      />
      <button
        className="w-[50%] h-full bg-green-600 rounded-md text-center text-white text-xl font-medium cursor-pointer hover:bg-green-500 btn border-none"
        type="submit"
      >
        CREATE PRODUCT
      </button>
    </div>
  );
}
