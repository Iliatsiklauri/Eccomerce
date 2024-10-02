import { Product } from "@/src/types/Product";
import React from "react";
type PropType = {
  product: null | Product;
};
export default function ProductComments({ product }: PropType) {
  return (
    <div className="flex items-start justify-center flex-col w-1/2 gap-5">
      <h2 className="text-blue-600 text-2xl font-medium">Comments</h2>
      {product?.comments && product?.comments.length === 0 ? (
        <div>No Comments</div>
      ) : (
        product?.comments.map((el) => (
          <div key={el.id} className="border-[1px] border-black w-full">
            <p className="font-bold text-black">{el.user.fullname}</p>
            <p className="text-black">{el.content}</p>
          </div>
        ))
      )}
    </div>
  );
}
