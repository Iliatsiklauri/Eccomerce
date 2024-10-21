import { getCategoryByid } from "@/src/api/CategoryApi";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

type PropType = {
  mainLink: string;
  category: string | null;
};

export default function BreadCrumbs({ mainLink, category }: PropType) {
  const [title, setTitle] = useState<null | { id: number; title: string }>(
    null
  );
  useEffect(() => {
    async function getData() {
      if (category !== null) {
        const res = await getCategoryByid(category);
        setTitle(res);
      }
    }
    getData();
  }, [category]);
  const paths = usePathname();
  const pathNames = paths.split("/").filter((path) => path);
  return (
    <div className="breadcrumbs text-md">
      <ul>
        <li>
          <Link href={"/"}>{mainLink}</Link>
        </li>
        {pathNames.map((el, key) => (
          <li key={key}>
            {title ? (
              <Link href={`/products?category=${title?.id}&page=1`}>
                {el === "products" && title?.title}
              </Link>
            ) : (
              <Link href={`/products?promotion=true&page=1`}>Promotions</Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
