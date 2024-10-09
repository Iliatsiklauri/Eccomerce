import React from "react";
import ProductFormTop from "./ProductFormTop";
import DescTextArea from "./DescTextArea";
import FormAmountPart from "./FormAmountPart";
import FormFiles from "./FormFiles";
import PinnedCheck from "./PinnedCheck";
import FormSubmit from "./FormSubmit";
import { CreateProductType, Product } from "@/src/types/Product";
import { Control, FieldErrors } from "react-hook-form";
import { CategoryType } from "@/src/types/Category";

type PropType = {
  product: Product | null;
  mode: string | null;
  category: [] | CategoryType[];
  control: Control<CreateProductType>;
  errors: FieldErrors<CreateProductType>;
  onSubmit: () => Promise<void>;
  description: string;
  setImageForPrev: React.Dispatch<React.SetStateAction<string | File | null>>;
  imageForPrev: null | string | File;
};

export default function CreateProductForm({
  product,
  setImageForPrev,
  description,
  category,
  control,
  onSubmit,
  errors,
  mode,
}: PropType) {
  return (
    <main className="w-[60%] h-full flex items-center justify-center flex-col pt-1 gap-10">
      <h2 className="text-3xl text-black font-medium">
        {mode === "add" ? "Create" : "Edit"}
      </h2>
      <form
        className="w-full h-full flex items-start justify-start flex-col pl-6 gap-6 2xl:gap-8 relative"
        onSubmit={onSubmit}
      >
        <ProductFormTop errors={errors} category={category} control={control} />
        <DescTextArea
          control={control}
          errors={errors}
          description={description}
        />

        <div className="flex items-end justify-between w-full">
          <FormAmountPart control={control} errors={errors} />
          <FormFiles
            product={product}
            errors={errors}
            control={control}
            setImageForPrev={setImageForPrev}
          />
        </div>

        <PinnedCheck control={control} mode={mode} product={product} />

        <FormSubmit mode={mode} />
      </form>
    </main>
  );
}
