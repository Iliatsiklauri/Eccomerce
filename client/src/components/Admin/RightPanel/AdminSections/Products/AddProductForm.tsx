"use client";
import { RootState } from "@/src/store/store";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import FormAmountPart from "./FormAmountPart";
import FormFileAndSubmit from "./FormFileAndSubmit";
import ProductFormTop from "./ProductFormTop";
import PinnedCheck from "./PinnedCheck";
import ProductPreview from "./ProductPreview";
import DescTextArea from "./DescTextArea";
import { createProductType } from "@/src/types/Product";

export default function AddProductsForm() {
  const { category, loading } = useSelector(
    (state: RootState) => state.category
  );

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm<createProductType>({
    defaultValues: {
      title: "",
      category: "",
      description: "",
      image: null,
      inStock: null,
      salePrice: null,
      price: null,
      pinned: false,
    },
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const title = watch("title");
  const category1 = watch("category");
  const description = watch("description");
  const price = watch("price");
  const salePrice = watch("salePrice");
  const inStock = watch("inStock");
  const onSubmit = (data: createProductType) => {
    console.log(data);
    reset();
  };

  return (
    <div className="w-full h-full flex items-center justify-between">
      <main className="w-[60%] h-full flex items-center justify-center flex-col pt-1 gap-10">
        <h2 className="text-3xl text-black font-medium">Create</h2>
        <form
          className="w-full h-full flex items-start justify-start flex-col pl-6 gap-6 2xl:gap-8 relative"
          onSubmit={handleSubmit(onSubmit)}
        >
          <ProductFormTop
            errors={errors}
            category={category}
            loading={loading}
            control={control}
          />

          <DescTextArea control={control} errors={errors} />

          <FormAmountPart control={control} errors={errors} />

          <PinnedCheck control={control} />

          <FormFileAndSubmit
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            control={control}
            errors={errors}
          />
        </form>
      </main>
      <div className="w-[1px] h-[80%] bg-black opacity-20"></div>
      <ProductPreview
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        title={title}
        category1={category1}
        description={description}
        price={price}
        salePrice={salePrice}
        inStock={inStock}
      />
    </div>
  );
}
