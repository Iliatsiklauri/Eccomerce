import { orderStatus } from "@/src/types/Order";
import React from "react";
type PropType = {
  orderStatus: orderStatus;
};
export default function StatusIcon({ orderStatus }: PropType) {
  return (
    <div
      className={`${
        orderStatus === "fullfiled"
          ? "bg-green-500"
          : orderStatus === "pending"
          ? "bg-yellow-300"
          : "bg-red-500"
      } w-[12px] h-[12px] rounded-full`}
    ></div>
  );
}
