"use client";
import React from "react";
import ProductSectionHeader from "./ProductSectionHeader";
import ProductsList from "./ProductsList";
import { useSearchParams } from "next/navigation";

export default function ProductsSection() {
  const params = useSearchParams();
  const mode = params.get("mode");
  return (
    <div className="w-full h-full rounded-xl shadow-md flex flex-col justify-between gap-3">
      <ProductSectionHeader mode={mode} />
      <ProductsList mode={mode} />
    </div>
  );
}
