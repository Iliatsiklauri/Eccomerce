import ProductsList from "@/src/components/Client/Category/ProductsList";
import ProductsListSkeleton from "@/src/components/Client/Category/ProductsListSkeleton";
import React, { Suspense } from "react";
import { Toaster } from "react-hot-toast";

export default function page() {
  return (
    <div className="container1 flex items-center justify-center flex-col gap-10 min-h-[450px]">
      <div>
        <Toaster position="top-right" reverseOrder={false} />
      </div>
      <Suspense fallback={<ProductsListSkeleton showheader />}>
        <ProductsList />
      </Suspense>
    </div>
  );
}
