import React from "react";
import ProductFormTop from "./ProductFormTop";
import DescTextArea from "./DescTextArea";
import FormAmountPart from "./FormAmountPart";
import FormFiles from "./FormFiles";
import PinnedCheck from "./PinnedCheck";
import FormFileAndSubmit from "./FormFileAndSubmit";
import { createProductType, Product } from "@/src/types/Product";
import {
  Control,
  FieldErrors,
  SubmitErrorHandler,
  SubmitHandler,
} from "react-hook-form";
import { CategoryType } from "@/src/types/Category";

type PropType = {
  product: Product | null;
  handleSubmit: (
    onValid: SubmitHandler<createProductType>,
    onInvalid?: SubmitErrorHandler<createProductType> | undefined
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  mode: string | null;
  category: [] | CategoryType[];
  control: Control<createProductType>;
  errors: FieldErrors<createProductType>;
  onSubmit: (data: createProductType) => Promise<void>;
  description: string;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;
};

export default function CreateProductForm({
  handleSubmit,
  product,
  description,
  category,
  control,
  setSelectedImage,
  onSubmit,
  errors,
  mode,
}: PropType) {
  return (
    <main className="w-[60%] h-full flex items-center justify-center flex-col pt-1 gap-10">
      <h2 className="text-3xl text-black font-medium">Create</h2>
      <form
        className="w-full h-full flex items-start justify-start flex-col pl-6 gap-6 2xl:gap-8 relative"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ProductFormTop errors={errors} category={category} control={control} />
        <DescTextArea
          control={control}
          errors={errors}
          description={description}
        />

        <div className="flex items-start justify-between w-full">
          <FormAmountPart control={control} errors={errors} />
          <FormFiles
            control={control}
            errors={errors}
            setSelectedImage={setSelectedImage}
          />
        </div>

        <PinnedCheck control={control} mode={mode} product={product} />

        <FormFileAndSubmit />
      </form>
    </main>
  );
}
