import { CategoryType } from "@/src/types/Category";
import { createProductType } from "@/src/types/Product";
import { createProductValidation } from "@/src/utils/CreateProductValidation";
import React, { useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";
import ProductInput from "./ProductInput";

type PropType = {
  category: [] | CategoryType[];
  loading: boolean;
  control: Control<createProductType>;
  errors: FieldErrors<createProductType>;
};

export default function ProductFormTop({
  category,
  errors,
  control,
}: PropType) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="flex items-center justify-between w-full">
      <Controller
        name={"title"}
        rules={createProductValidation.title}
        control={control}
        render={({ field }) => (
          <ProductInput error={errors.title} label="Title" field={field} />
        )}
      />

      <Controller
        name={"brand"}
        rules={createProductValidation.brand}
        control={control}
        render={({ field }) => (
          <ProductInput field={field} error={errors.brand} label="Brand" />
        )}
      />

      <Controller
        name="category"
        rules={createProductValidation.category}
        control={control}
        render={({ field }) => (
          <main className="dropdown relative w-[30%] max-w-[370px] h-[50px] z-10">
            <div
              className={`w-full flex items-center justify-between h-full bg-slate-200  hover:bg-slate-300 rounded-md cursor-pointer pl-4 text-black text-md ${
                errors.category && "border-red-500 border-[1px]"
              }`}
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              {field.value ? field.value : ("Select a category" as string)}
              {errors.category && !showDropdown && (
                <p className="text-red-500 text-xs absolute bottom-[-16px] right-0 z-0 ">
                  {errors.category.message}
                </p>
              )}
            </div>

            {showDropdown && (
              <ul className=" rounded-md  w-full p-2 mt-2 bg-slate-200 shadow-xl z-30">
                {category.map((el: CategoryType) => (
                  <div
                    className="h-[40px] w-full hover:bg-slate-300 cursor-pointer rounded-md px-2 py-2 gap-x-2"
                    key={el.id}
                    onClick={() => {
                      field.onChange(el.title);
                      setShowDropdown(!showDropdown);
                    }}
                  >
                    <span className="text-black font-medium text-md">
                      {el.title}
                    </span>
                  </div>
                ))}
              </ul>
            )}
          </main>
        )}
      />
    </div>
  );
}
