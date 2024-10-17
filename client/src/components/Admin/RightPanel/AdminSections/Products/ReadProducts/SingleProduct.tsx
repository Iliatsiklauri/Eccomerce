import { deleteProductbyId } from '@/src/api/ProductsApi';
import { Product } from '@/src/types/Product';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

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
        </div>
      </td>
      <td className="font-medium text-cyan-500">{product.title}</td>
      <td className="font-medium text-md">{product.inStock}</td>
      <td className="">{product.category.title}</td>

      <td>
        {product.pinned && (
          <Image
            src={'/icons/adminPanel/pin.png'}
            alt="pinned product"
            width={30}
            height={30}
          />
        )}
      </td>
      <td className="w-[180px] text-[13px]">
        {product.description.slice(0, 40)}
        {product.description.length > 40 && '...'}
      </td>
      <td>₾{product.salePrice}</td>
      <td>₾{product.price}</td>
      <td className="font-normal">{product.createdAt.slice(0, 10)}</td>
      <td className="relative">
        <div className="dropdown dropdown-end">
          <button role="button" tabIndex={0}>
            <Image
              alt="more"
              src={'/icons/adminPanel/more.png'}
              width={44}
              height={44}
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
                const deleteProduct = await deleteProductbyId(product.id);
                if (!deleteProduct) console.log('error');
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
