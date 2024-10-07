import React, { useState } from "react";
import TableHeader from "./TableHeader";
import SingleProduct from "./SingleProduct";
import { Product } from "@/src/types/Product";
type PropType = {
  products: [] | Product[];
};
export default function ProductsTable({ products }: PropType) {
  const [productInfo, setProductInfo] = useState<null | number>(null);
  return (
    <table className="table">
      <TableHeader />
      <tbody>
        {products?.map((el, key) => (
          <SingleProduct
            product={el}
            key={key}
            productInfo={productInfo}
            setProductInfo={setProductInfo}
          />
        ))}
      </tbody>
    </table>
  );
}
