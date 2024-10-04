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
    <div className="w-[30%] flex justify-between items-start flex-col gap-8">
      <Controller
        name="inStock"
        control={control}
        rules={createProductValidation.inStock}
        render={({ field }) => (
          <section className="relative w-full h-[50px]">
            <p className="absolute text-black font-medium text-sm top-[-21px]">
              In Stock
            </p>
            <input
              {...field}
              value={field.value !== null ? field.value : ""}
              type="text"
              className={`w-full h-full bg-slate-200 pl-4 focus:outline-none rounded-md text-black  ${
                errors.inStock &&
                "border-red-500 border-[1px] focus:border-red-500"
              }`}
              placeholder="Amount"
            />
            {errors.inStock && (
              <p className="text-red-500 text-xs bottom-[-17px] right-0 absolute">
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
          <section className="relative w-full h-[50px]">
            <p className="absolute text-black font-medium text-sm top-[-21px]">
              Initial Price
            </p>
            <input
              {...field}
              value={field.value !== null ? field.value : ""}
              type="text"
              className={`w-full h-full bg-slate-200 border-[1px] pl-4 rounded-md input focus:outline-none text-black  ${
                errors.price &&
                "border-red-500 border-[1px] focus:border-red-500"
              }`}
              placeholder="Initial Price"
            />
            {errors.price && (
              <p className="text-red-500 text-xs bottom-[-17px] right-0 absolute">
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
          <section className="relative w-full h-[50px]">
            <p className="absolute text-black font-medium text-sm top-[-21px]">
              Sale Price
            </p>
            <input
              {...field}
              value={field.value !== null ? field.value : ""}
              type="text"
              className={`w-full h-full bg-slate-200 pl-4 rounded-md input text-black focus:outline-none 
                 ${
                   errors.salePrice &&
                   "border-red-500 border-[1px] focus:border-red-500"
                 }
                `}
              placeholder="Sale Price"
            />
            {errors.salePrice && (
              <p className="text-red-500 text-xs bottom-[-17px] right-0 absolute">
                {errors?.salePrice.message}
              </p>
            )}
          </section>
        )}
      />
    </div>
  );
}
