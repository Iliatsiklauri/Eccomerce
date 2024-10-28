import { fetchProductsByCategory } from "@/src/api/ProductsApi";
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
  const [loading1, setLoading1] = useState(false);
  const router = useRouter();
  const params = useSearchParams();
  const category = params.get("category");
  const page = params.get("page") ? Number(params.get("page")) : 1;
  useEffect(() => {
    async function getData() {
      const res = await fetchProductsByCategory({
        pinned: true,
        page: Number(page),
        category: Number(category),
      });
      setProduct(res.products);
      setTotal(res.total);
      setLoading(false);
    }
    getData();
  }, [page, category, loading1]);

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
        <div className="w-full h-full flex items-center justify-between flex-col overflow-y-auto pb-3 gap-3 ">
          <ProductsTable
            products={products}
            setLoading={setLoading1}
            loading={loading1}
          />
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
