import React from "react";

export default function TableHeader() {
  return (
    <thead className="border-b-opacity-35">
      <tr className="text-[16px] text-black font-medium border-opacity-35">
        <th>ID</th>
        <th>Image</th>
        <th>Title</th>
        <th>In Stock</th>
        <th>Category</th>
        <th>Pinned</th>
        <th>Description</th>
        <th>Price</th>
        <th>Sale Price</th>
        <th>Posted At</th>
      </tr>
    </thead>
  );
}
