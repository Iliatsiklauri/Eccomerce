"use client";
import { RootState } from "@/src/store/store";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ProductPreview from "./ProductPreview";
import { createProductType, defaultValues, Product } from "@/src/types/Product";
import { createProduct, getProductById } from "@/src/api/ProductsApi";
import ApiInfoModal from "./ApiInfoModal";
import { useSearchParams } from "next/navigation";
import CreateProductForm from "./CreateProductForm";

type PropType = {
  mode: string | null;
};

export default function AddProductsForm({ mode }: PropType) {
  const { category } = useSelector((state: RootState) => state.category);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm<createProductType>({
    defaultValues: defaultValues,
  });

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [error, setError] = useState(false);
  const [productId, setProductId] = useState(0);
  const [success, setSuccess] = useState(false);
  const [product, setProduct] = useState<null | Product>(null);

  const title = watch("title");
  const category1 = watch("category");
  const description = watch("description");
  const price = watch("price");
  const salePrice = watch("salePrice");
  const brand = watch("brand");
  const inStock = watch("inStock");
  const pinned = watch("pinned");

  const params = useSearchParams();

  const id = params.get("id");
  useEffect(() => {
    async function getData() {
      if (mode === "edit") {
        if (id) {
          const res = await getProductById(id);
          setProduct(res);
          reset({
            title: res?.title,
            brand: res?.brand,
            category: res?.category.title,
            description: res?.description,
            inStock: res?.inStock,
            salePrice: res?.salePrice,
            price: res?.price,
            pinned: res?.pinned,
          });
        }
      }
    }
    getData();
  }, [id, reset, mode]);

  const onSubmit = async (data: createProductType) => {
    try {
      const res = await createProduct(data);
      if (res) {
        setProductId(res.id);
        setSuccess(true);
        reset();
        return;
      }
      setError(true);
    } catch (er) {
      setError(true);
      console.log(error);
      console.log(er, "error while creating product");
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-between relative">
      {success && (
        <ApiInfoModal
          id={productId}
          setSuccess={setSuccess}
          success={success}
        />
      )}
      <CreateProductForm
        setSelectedImage={setSelectedImage}
        description={description}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        product={product}
        category={category}
        control={control}
        errors={errors}
        mode={mode}
      />

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
        pinned={pinned}
        brand={brand}
      />
    </div>
  );
}
