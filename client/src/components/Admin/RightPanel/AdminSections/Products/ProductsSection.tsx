"use client";
import React from "react";
import ProductSectionHeader from "./ProductSectionHeader";
import ProductsList from "./ProductsList";

export default function ProductsSection() {
  return (
    <div className="w-full h-full rounded-xl shadow-md flex flex-col justify-between">
      <ProductSectionHeader />
      <ProductsList />
    </div>
  );
}
