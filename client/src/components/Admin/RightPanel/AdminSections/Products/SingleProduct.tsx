import { Product } from "@/src/types/Product";
import Image from "next/image";
import React from "react";

type ProductType = {
  product: Product;
};
export default function SingleProduct({ product }: ProductType) {
  return (
    <tr className="border-opacity-35 text-black text-[14px]">
      <td>{product.id}</td>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="h-[45px] w-[45px] relative shadow-xl border-[2px] border-black">
              <Image alt="product" src={product.image} fill />
            </div>
          </div>
          <div>
            <div className="font-medium text-cyan-500">{product.title}</div>
          </div>
        </div>
      </td>
      <td className="">{product.category.title}</td>

      <td>
        {product.pinned && (
          <Image
            src={"/icons/adminPanel/pin.png"}
            alt="pinned product"
            width={30}
            height={30}
          />
        )}
      </td>
      <td className="w-[180px]">{product.description}</td>
      <td>₾{product.salePrice}</td>
      <td>₾{product.price}</td>
      <th className="font-normal">{product.createdAt.slice(0, 10)}</th>
    </tr>
  );
}
