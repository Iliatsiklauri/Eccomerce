import { fetchProducts } from "@/src/api/ProductsApi";
import { Product } from "@/src/utils/data";
import React, { useEffect, useState } from "react";
import SingleProduct from "./SingleProduct";

export default function ProductsList() {
  const [products, setProduct] = useState<null | Product[]>(null);
  useEffect(() => {
    async function getData() {
      const res = await fetchProducts({ pinned: true });
      setProduct(res.products);
    }
    getData();
  }, []);
  return (
    <div className="overflow-y-auto bg-white h-[85%] rounded-xl p-2">
      <table className="table">
        <thead className="border-b-opacity-35">
          <tr className="text-[16px] text-black font-medium border-opacity-35">
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Pinned</th>
            <th>Description</th>
            <th>Price</th>
            <th>Sale Price</th>
            <th>Posted At</th>
          </tr>
        </thead>
        <tbody>
          {products?.map((el, key) => (
            <SingleProduct product={el} key={key} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
