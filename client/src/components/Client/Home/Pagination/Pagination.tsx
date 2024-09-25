import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

type PropType = {
  total?: number;
  active: string | null;
};

export default function Pagination({ total, active }: PropType) {
  const params = useSearchParams();
  const page = params.get("page");
  const TotalPageCount = total ? Math.ceil(total / 20) : 0;
  const indicator = page ? Number(page) : 1;

  const pageButtons = [];
  for (let i = 1; i <= TotalPageCount; i++) {
    pageButtons.push(i);
  }

  return (
    <div className="join">
      {indicator > 1 ? (
        <Link
          className="join-item btn"
          href={`/products?category=${active}&page=${indicator - 1}`}
        >
          «
        </Link>
      ) : (
        <div className="join-item btn disabled">«</div>
      )}

      {pageButtons.map((pg) => (
        <Link
          key={pg}
          className={`join-item btn ${indicator === pg && "btn-active"}`}
          href={`/products?category=${active}&page=${pg}`}
        >
          {pg}
        </Link>
      ))}

      {indicator < TotalPageCount ? (
        <Link
          className="join-item btn"
          href={`/products?category=${active}&page=${indicator + 1}`}
        >
          »
        </Link>
      ) : (
        <div className="join-item btn disabled">»</div>
      )}
    </div>
  );
}
