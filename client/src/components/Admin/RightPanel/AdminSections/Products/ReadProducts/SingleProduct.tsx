import { deleteProductbyId } from "@/src/api/ProductsApi";
import { Product } from "@/src/types/Product";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ProductType = {
  product: Product;
  setProductInfo: React.Dispatch<React.SetStateAction<number | null>>;
  productInfo: null | number;
};
export default function SingleProduct({
  product,
  productInfo,
  setProductInfo,
}: ProductType) {
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
        </div>
      </td>
      <td className="font-medium text-cyan-500">{product.title}</td>
      <td className="font-medium text-md">{product.inStock}</td>
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
      <td className="w-[180px] text-[13px]">
        {product.description.slice(0, 40)}
        {product.description.length > 40 && "..."}
      </td>
      <td>₾{product.salePrice}</td>
      <td>₾{product.price}</td>
      <td className="font-normal">{product.createdAt.slice(0, 10)}</td>
      <td className="relative">
        <Image
          alt="more"
          src={"/icons/adminPanel/more.png"}
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={() =>
            setProductInfo(productInfo === product.id ? null : product.id)
          }
        />
        {productInfo === product.id && (
          <div className="absolute w-[120px] h-[80px] rounded-xl z-10 left-[-108px] top-[-5px]  bg-slate-100 shadow-xl overflow-hidden border-darkBrown border-[1px] border-opacity-30">
            <Link
              href={`/admin/Products?mode=edit&id=${product.id}`}
              className="w-full h-1/2 block text-center p-2 "
            >
              Edit
            </Link>

            <div
              className="h-1/2 w-full hover:bg-red-600 text-center p-2 cursor-pointer bg-red-500 font-medium "
              onClick={async () => {
                const deleteProduct = await deleteProductbyId(product.id);
                if (!deleteProduct) console.log("error");
              }}
            >
              Delete
            </div>
          </div>
        )}
      </td>
    </tr>
  );
}
