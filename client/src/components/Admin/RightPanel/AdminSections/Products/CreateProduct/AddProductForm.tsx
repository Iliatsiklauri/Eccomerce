"use client";
import { RootState } from "@/src/store/store";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import ProductPreview from "./ProductPreview";
import {
  CreateProductType,
  defaultValues,
  Product,
  UpdateProductType,
} from "@/src/types/Product";
import {
  createProduct,
  getProductById,
  updateProduct,
} from "@/src/api/ProductsApi";
import ApiInfoModal from "./ApiInfoModal/ApiInfoModal";
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
  } = useForm<CreateProductType>({
    defaultValues: defaultValues,
  });

  const [productId, setProductId] = useState(0);
  const [modal, setModal] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<null | Product>(null);
  const [imageForPrev, setImageForPrev] = useState<null | string | File>(null);
  const [pinnedImage, setPinnedImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

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
            brand: res?.brand || "brand",
            category: res?.category.id,
            description: res?.description,
            inStock: res?.inStock || 1,
            salePrice: res?.salePrice,
            price: res?.price,
            pinned: res?.pinned,
          });
        }
      }
    }
    getData();
  }, [id, reset, mode]);

  const onSubmit = async (data: CreateProductType | UpdateProductType) => {
    setError(null);
    setLoading(true);
    setModal(true);

    try {
      let res;
      data.description = data?.description?.replace(/\s+/g, " ");

      if (mode === "add") {
        res = await createProduct(data as CreateProductType);
      } else if (mode === "edit" && id) {
        res = await updateProduct(
          {
            ...data,
            image: data.image || product?.image,
            pinnedImage: data.pinnedImage || product?.pinnedImage,
          } as UpdateProductType,
          id
        );
      }

      if (res.error) {
        setError(res.error.message);
      } else {
        if (mode === "edit" && product) {
          setProductId(product?.id);
        } else {
          setProductId(res.id);
        }

        setLoading(false);
        setImageForPrev(null);
        setPinnedImage(null);
        setLoading(false);
        reset();
      }
    } catch (er) {
      setError("Unexpected error occured");
      console.error(er, "error while processing product");
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-between relative">
      {modal && (
        <ApiInfoModal
          loading={loading}
          id={productId}
          setModal={setModal}
          mode={mode}
          error={error}
        />
      )}
      <CreateProductForm
        pinnedImage={pinnedImage}
        setPinnedImage={setPinnedImage}
        imageForPrev={imageForPrev}
        setImageForPrev={setImageForPrev}
        description={description}
        onSubmit={handleSubmit(onSubmit)}
        product={product}
        category={category}
        control={control}
        errors={errors}
        mode={mode}
      />

      <div className="w-[1px] h-[80%] bg-black opacity-20"></div>
      <ProductPreview
        product={product}
        imageForPrev={imageForPrev}
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
