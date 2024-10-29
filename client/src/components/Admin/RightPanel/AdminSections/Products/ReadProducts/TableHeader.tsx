import { RootState } from "@/src/store/store";
import { CategoryType } from "@/src/types/Category";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

export default function TableHeader() {
  const { category } = useSelector((state: RootState) => state.category);
  const updatedCategories = [
    { title: "All", id: 20 } as CategoryType,
    ...category,
  ];

  const params = useSearchParams();
  const currentParams = new URLSearchParams(params.toString());
  const router = useRouter();
  return (
    <thead className="border-b-opacity-35">
      <tr className="text-[16px] text-black font-medium border-opacity-35">
        <th>ID</th>
        <th>Image</th>
        <th>Title</th>
        <th>In Stock</th>
        <th>
          <div className="dropdown dropdown-bottom">
            <div
              tabIndex={0}
              role="button"
              className="flex items-center justify-center gap-2"
            >
              <p>Category</p>
              <Image
                src={"/icons/adminPanel/arrow-down.png"}
                width={22}
                height={22}
                alt="arrow"
              />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-lightWhite rounded-box z-[1] w-52 p-2 shadow mt-3"
            >
              {updatedCategories.map((el: CategoryType) => (
                <div
                  key={el.id}
                  className="h-[30px] hover:bg-black hover:bg-opacity-10 rounded-md p-2 cursor-pointer"
                  onClick={() => {
                    if (el.title === "All") {
                      return router.push("/admin/Products");
                    }
                    currentParams.set("category", `${el.id}`);
                    router.push(`/admin/Products?${currentParams.toString()}`);
                  }}
                >
                  <p>{el.title}</p>
                </div>
              ))}
            </ul>
          </div>
        </th>
        <th>Pinned</th>
        <th>Description</th>
        <th>Price</th>
        <th>Sale Price</th>
        <th>Posted At</th>
      </tr>
    </thead>
  );
}
