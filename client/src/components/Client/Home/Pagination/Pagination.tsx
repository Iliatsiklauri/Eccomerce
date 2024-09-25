import Link from "next/link";
import React from "react";

type PropType = {
  total?: number;
  active: string | null;
};

export default function Pagination({ total, active }: PropType) {
  const pageCount = total ? Math.ceil(total / 20) : 0;
  const pageButtons = [];

  for (let i = 1; i <= pageCount; i++) {
    pageButtons.push(i);
  }

  return (
    <div className="join">
      <div className="join-item btn">«</div>
      {pageButtons.map((page) => (
        <Link
          key={page}
          className="join-item btn"
          href={`/products?category=${active}&page=${page}`}
        >
          {page}
        </Link>
      ))}
      <div className="join-item btn">»</div>
    </div>
  );
}
