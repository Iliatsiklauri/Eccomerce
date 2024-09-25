import ProductsList from "@/src/components/Client/Category/ProductsList";
import React, { Suspense } from "react";

export default function page() {
  return (
    <div className="container1 flex items-center justify-center flex-col gap-10 min-h-[450px]">
      <Suspense>
        <ProductsList />
      </Suspense>
    </div>
  );
}
