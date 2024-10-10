import { CreateProductType, Product } from "@/src/types/Product";
import { createProductValidation } from "@/src/utils/CreateProductValidation";
import React, { useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";

type PropType = {
  errors: FieldErrors<CreateProductType>;
  control: Control<CreateProductType>;
  setImageForPrev: React.Dispatch<React.SetStateAction<string | null | File>>;
  product: Product | null;
  imageForPrev: null | string | File;
};

export default function FormFiles({
  product,
  errors,
  control,
  setImageForPrev,
  imageForPrev,
}: PropType) {
  const [pinnedImage, setPinnedImage] = useState<File | null>(null);
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
            <label className={`w-full h-full cursor-pointer`}>
              <div
                className={`w-full h-full rounded-md flex items-center justify-start bg-slate-300 overflow-hidden
                ${errors.image ? "border-red-500 border-[1px]" : ""}
                `}
              >
                <p className="w-[30%] h-full bg-slate-900 flex items-center justify-center font-medium text-md flex-shrink-0">
                  CHOOSE FILE
                </p>
                <div className="w-full h-full  flex items-center justify-start overflow-hidden pl-[-10px] text-black text-[11px]">
                  {imageForPrev instanceof File
                    ? imageForPrev?.name
                    : product
                    ? product.image
                    : "No file chosen"}
                </div>
              </div>
              <input
                className="hidden"
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setImageForPrev(file);
                  onChange(file);
                }}
              />
            </label>
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
            <label className={`w-full h-full cursor-pointer`}>
              <div
                className={`w-full h-full rounded-md flex items-center justify-start bg-slate-300 overflow-hidden
              ${errors.pinnedImage ? "border-red-500 border-[1px]" : ""}
              `}
              >
                <p className="w-[30%] h-full bg-slate-900 flex items-center justify-center font-medium text-md flex-shrink-0">
                  CHOOSE FILE
                </p>
                <div className="w-full h-full flex items-center justify-start overflow-hidden pl-5 text-black text-[11px]">
                  {pinnedImage instanceof File
                    ? pinnedImage?.name
                    : product
                    ? product.pinnedImage
                    : "No file chosen"}
                </div>
              </div>
              <input
                className="hidden"
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setPinnedImage(file);
                  onChange(file);
                }}
              />
            </label>
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
