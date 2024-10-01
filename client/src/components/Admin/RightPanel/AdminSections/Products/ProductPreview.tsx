import Image from "next/image";
import React from "react";
type PropType = {
  selectedImage: File | null;
  setSelectedImage: React.Dispatch<React.SetStateAction<File | null>>;
  title: string;
  category1: string;
  description: string;
  price: number | null;
  salePrice: number | null;
  inStock: number | null;
};
export default function ProductPreview({
  selectedImage,
  setSelectedImage,
  category1,
  description,
  inStock,
  price,
  salePrice,
  title,
}: PropType) {
  return (
    <div className="w-[30%]  h-full pr-6  flex flex-col items-center justify-start gap-10 pt-1">
      <h2 className="text-3xl text-black font-medium">Preview</h2>
      <div className="flex flex-col items-center justify-center w-full text-black">
        {selectedImage && (
          <div className="relative w-[80%] h-[230px] broder-black border-2">
            <Image
              src={URL.createObjectURL(selectedImage)}
              fill
              alt="Product image"
            />
          </div>
        )}
        <p>title: {title}</p>
        <p>description: {description}</p>
        <p>inStock: {inStock}</p>
        <p>Price: {price}</p>
        <p>salePrice: {salePrice}</p>
        <p>category: {category1}</p>
      </div>
    </div>
  );
}
