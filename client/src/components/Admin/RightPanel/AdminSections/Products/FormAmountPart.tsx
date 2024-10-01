import { createProductType } from "@/src/types/Product";
import { createProductValidation } from "@/src/utils/CreateProductValidation";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
type PropType = {
  control: Control<createProductType>;
  errors: FieldErrors<createProductType>;
};
export default function FormAmountPart({ control, errors }: PropType) {
  return (
    <div className="w-full flex justify-between items-center">
      <Controller
        name="inStock"
        control={control}
        rules={createProductValidation.inStock}
        render={({ field }) => (
          <section className="relative w-[30%] max-w-[250px] h-[50px]">
            <p className="absolute text-black font-medium text-sm top-[-19px]">
              In Stock
            </p>
            <input
              {...field}
              value={field.value !== null ? field.value : ""}
              type="text"
              className="w-full h-full bg-slate-200 border-[1px] pl-4 rounded-md input text-black"
              placeholder="Amount"
            />
            {errors.inStock && (
              <p className="text-red-500 text-xs bottom-[-15px] right-0 absolute">
                {errors?.inStock.message}
              </p>
            )}
          </section>
        )}
      />
      <Controller
        name="price"
        control={control}
        rules={createProductValidation.price}
        render={({ field }) => (
          <section className="relative w-[30%] max-w-[250px] h-[50px]">
            <p className="absolute text-black font-medium text-sm top-[-19px]">
              Initial Price
            </p>
            <input
              {...field}
              value={field.value !== null ? field.value : ""}
              type="text"
              className="w-full h-full bg-slate-200 border-[1px] pl-4 rounded-md input text-black"
              placeholder="Initial Price"
            />
            {errors.price && (
              <p className="text-red-500 text-xs bottom-[-14px] right-0 absolute">
                {errors?.price.message}
              </p>
            )}
          </section>
        )}
      />
      <Controller
        name="salePrice"
        control={control}
        rules={createProductValidation.salePrice}
        render={({ field }) => (
          <section className="relative w-[30%] max-w-[250px] h-[50px]">
            <p className="absolute text-black font-medium text-sm top-[-19px]">
              Sale Price
            </p>
            <input
              {...field}
              value={field.value !== null ? field.value : ""}
              type="text"
              className="w-full h-full bg-slate-200 border-[1px] pl-4 rounded-md input text-black"
              placeholder="Sale Price"
            />
            {errors.salePrice && (
              <p className="text-red-500 text-xs bottom-[-14px] right-0 absolute">
                {errors?.salePrice.message}
              </p>
            )}
          </section>
        )}
      />
    </div>
  );
}
