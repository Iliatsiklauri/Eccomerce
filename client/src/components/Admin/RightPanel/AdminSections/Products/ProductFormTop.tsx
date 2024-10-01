import { CategoryType } from "@/src/types/Category";
import { createProductType } from "@/src/types/Product";
import { createProductValidation } from "@/src/utils/CreateProductValidation";
import React, { useState } from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";

type PropType = {
  category: [] | CategoryType[];
  loading: boolean;
  control: Control<createProductType>;
  errors: FieldErrors<createProductType>;
};

export default function ProductFormTop({
  category,
  loading,
  errors,
  control,
}: PropType) {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="flex items-center justify-between w-full">
      <Controller
        name="title"
        rules={createProductValidation.title}
        control={control}
        render={({ field }) => (
          <section className="relative w-[43%] max-w-[370px] h-[50px]">
            <input
              {...field}
              type="text"
              className="w-full h-full bg-slate-200 border-[1px] pl-4 rounded-md input text-black"
              placeholder="title"
            />

            {errors.title && (
              <p className="text-red-500 text-xs bottom-[-16px] right-0 absolute">
                {errors?.title.message}
              </p>
            )}
          </section>
        )}
      />
      <Controller
        name="category"
        rules={createProductValidation.category}
        control={control}
        render={({ field }) => (
          <main className="dropdown relative w-[43%] max-w-[370px] h-[50px] z-10">
            <div
              className="w-full flex items-center justify-between h-full bg-slate-200 border-none hover:bg-slate-300 rounded-md cursor-pointer pl-4 text-black text-md"
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
