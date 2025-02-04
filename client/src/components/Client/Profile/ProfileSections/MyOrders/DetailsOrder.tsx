import { Order } from "@/src/types/Order";
import React from "react";
import StatusIcon from "./StatusIcon";
type PropType = {
  order: Order;
  admin?: boolean;
};

export default function DetailsOrder({ order, admin }: PropType) {
  let total;
  if (order && order.products.length > 0) {
    total = order.products.reduce((acc, current) => {
      return acc + current.product.salePrice * current.quantity;
    }, 0);
  }
  return (
    <div className="flex flex-col items-start justify-center w-full gap-1 pr-3">
      <div className="flex gap-2 text-sm text-black">
        <p className="font-semibold">ORDER: {order.id}</p>
        <p className="font-semibold">Total: {total}$</p>
      </div>
      <div className="flex text-black text-[12px] text-opacity-80 gap-4 w-full">
        <p className="">Products: {order.products.length}</p>
        <p>
          Date: {new Date(order.createdAt).toLocaleString().replace(",", "")}
        </p>
        <div
          className={` flex items-center justify-center gap-1 flex-shrink-0 ${
            admin &&
            "border-black border-[2px] border-opacity-20 p-1 rounded-lg"
          } `}
        >
          <StatusIcon orderStatus={order.orderStatus} />
          <p>Status : {order.orderStatus}</p>
        </div>
      </div>
    </div>
  );
}
