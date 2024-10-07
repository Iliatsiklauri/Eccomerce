import { fetchProducts } from "@/src/api/ProductsApi";
import React, { useEffect, useState } from "react";
import AddProductsForm from "../CreateProduct/AddProductForm";
import { Product } from "@/src/types/Product";
import ProductsTable from "./ProductsTable";
import Pagination from "@/src/components/Client/Home/Pagination/Pagination";
import { useRouter, useSearchParams } from "next/navigation";
type PropType = {
  mode: string | null;
};
export default function ProductsList({ mode }: PropType) {
  const [products, setProduct] = useState<[] | Product[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useSearchParams();
  const page = params.get("page") ? Number(params.get("page")) : 1;
  useEffect(() => {
    async function getData() {
      const res = await fetchProducts({ pinned: true, page: Number(page) });
      setProduct(res.products);
      setTotal(res.total);
      setLoading(false);
    }
    getData();
  }, [page]);
  return (
    <div className="overflow-y-auto bg-white rounded-xl p-2 h-full">
      {loading ? (
        <div className="w-full h-full flex items-center justify-start flex-col gap-4">
          {Array.from({ length: 10 }, (_, index) => (
            <div
              className="skeleton bg-black bg-opacity-15 h-[70px] rounded-xl w-full"
              key={index}
            ></div>
          ))}
        </div>
      ) : mode === "read" ? (
        <div className="w-full h-full flex items-center justify-start flex-col overflow-y-auto pb-3 gap-3">
          <ProductsTable products={products} />
          <Pagination
            total={total}
            activePage={page}
            onChange={(newPage) => {
              router.push(`/admin/Products?mode=read&page=${newPage}`);
            }}
          />
        </div>
      ) : (
        <AddProductsForm mode={mode} />
      )}
    </div>
  );
}
