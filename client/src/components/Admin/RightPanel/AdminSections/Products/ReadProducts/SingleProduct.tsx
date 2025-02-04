import { deleteProductbyId } from "@/src/api/ProductsApi";
import { Product } from "@/src/types/Product";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ProductType = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  product: Product;
  setRes: React.Dispatch<
    React.SetStateAction<{
      status: number;
      success?: {
        message: string;
      };
      error?: {
        message: string;
      };
    } | null>
  >;
};

export default function SingleProduct({
  product,
  setLoading,
  setModal,
  setRes,
}: ProductType) {
  return (
    <tr className="border-opacity-35 text-black text-[14px]">
      <td>{product.id}</td>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="h-[45px] w-[45px] relative shadow-xl border-[2px] border-black">
              <Image alt="product" src={product.image} fill sizes="45px" />
            </div>
          </div>
        </div>
      </td>
      <td className="font-medium text-cyan-500">
        <Link className="hover:underline" href={`/products/${product.id}`}>
          {product.title}
        </Link>
      </td>
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
        <div className="dropdown dropdown-end">
          <button role="button" tabIndex={0} className="w-[40px] h-[40px]">
            <Image
              alt="more"
              src={"/icons/adminPanel/more.png"}
              width={23}
              height={23}
              className="cursor-pointer"
            />
          </button>
          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content rounded-box z-[1] shadow-lg  text-lg font-medium bg-lightWhite gap-2"
          >
            <li className="bg-white rounded-lg">
              <Link href={`/admin/Products?mode=edit&id=${product.id}`}>
                Edit
              </Link>
            </li>
            <li
              className="bg-red-500 rounded-lg"
              onClick={async () => {
                setLoading(true);
                const deleteProduct = await deleteProductbyId(product.id);
                setRes(deleteProduct);
                setModal(true);
                setLoading(false);
              }}
            >
              <p>Delete</p>
            </li>
          </ul>
        </div>
      </td>
    </tr>
  );
}
