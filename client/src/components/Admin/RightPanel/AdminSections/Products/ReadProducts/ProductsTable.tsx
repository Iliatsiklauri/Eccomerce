import React from "react";
import TableHeader from "./TableHeader";
import SingleProduct from "./SingleProduct";
import { Product } from "@/src/types/Product";
type PropType = {
  products: [] | Product[];
};
export default function ProductsTable({ products }: PropType) {
  return (
    <table className="table">
      <TableHeader />
      <tbody>
        {products?.map((el, key) => (
          <SingleProduct product={el} key={key} />
        ))}
      </tbody>
    </table>
  );
}
