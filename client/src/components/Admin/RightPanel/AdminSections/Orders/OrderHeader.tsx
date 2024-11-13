import { Order } from "@/src/types/Order";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

type PropType = {
  orders: Order[] | null;
  total: number | undefined;
};

export default function OrderHeader({ total }: PropType) {
  const params = useSearchParams();
  const currentParams = new URLSearchParams(params.toString());
  const router = useRouter();
  return (
    <div className="w-full h-[90px] flex-shrink-0 p-2 ">
      <div className="text-white text-xl bg-slate-200 flex items-center justify-between border-black border-[1px] border-opacity-10 w-full h-full rounded-xl">
        <div className="w-[40%] 2xl:w-1/3 h-full flex-shrink-0 bg-slate-500 flex items-center justify-center flex-col rounded-tl-lg rounded-bl-lg">
          <p>ORDERS</p>
          <p className="text-sm">
            <span>Total orders : </span>
            {total}
          </p>
        </div>
        <div className="w-[38%] 2xl:w-[29%] h-full flex-shrink-0 bg-slate-600 flex items-center justify-center">
          USERS
        </div>
        <div className="w-full h-full bg-slate-700 flex items-center justify-center z-50 rounded-tr-lg rounded-br-lg">
          <div className="dropdown dropdown-bottom dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="m-1 flex items-start justify-center gap-2"
            >
              <p>FILTER BY</p>
              <Image
                src={"/icons/adminPanel/icons8-triangle-50.png"}
                alt="arrow"
                width={20}
                height={20}
              />
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box z-[1] w-52 p-2 shadow bg-slate-800 mt-5 font-medium text-md"
            >
              <li className="flex items-start justify-between w-full">
                <a
                  className="w-full flex items-center justify-between"
                  onClick={() => {
                    currentParams.delete("status");
                    router.push(`/admin/Orders?${currentParams.toString()}`);
                  }}
                >
                  ALL
                </a>
                <a
                  className="w-full flex items-center justify-between"
                  onClick={() => {
                    currentParams.set("status", `${"fullfiled"}`);
                    router.push(`/admin/Orders?${currentParams.toString()}`);
                  }}
                >
                  Fullfiled
                  <span className="w-[12px] h-[12px] bg-green-500 rounded-full"></span>
                </a>
              </li>
              <li>
                <a
                  className="w-full flex items-center justify-between "
                  onClick={() => {
                    currentParams.set("status", `${"failed"}`);
                    router.push(`/admin/Orders?${currentParams.toString()}`);
                  }}
                >
                  Failed
                  <span className="w-[12px] h-[12px] bg-red-500 rounded-full"></span>
                </a>
              </li>
              <li>
                <a
                  className="w-full flex items-center justify-between "
                  onClick={() => {
                    currentParams.set("status", `${"pending"}`);
                    router.push(`/admin/Orders?${currentParams.toString()}`);
                  }}
                >
                  Pending
                  <span className="w-[12px] h-[12px] bg-yellow-500 rounded-full"></span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
