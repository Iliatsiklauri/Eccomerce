import { Order } from "@/src/types/Order";
import React from "react";
import IconOrder from "./IconOrder";
import DetailsOrder from "./DetailsOrder";
import Image from "next/image";
import OrderProducts from "./OrderProducts";

type PropType = {
  order: Order;
  setActiveOrder: React.Dispatch<React.SetStateAction<number | null>>;
  activeOrder: number | null;
};

export default function SingleOrder({
  order,
  activeOrder,
  setActiveOrder,
}: PropType) {
  return (
    <div className="w-full flex flex-col gap-3">
      <div
        className="w-full h-[70px] flex items-center justify-between rounded-md shadow-sm border-[1px] bg-slate-100 border-black  border-opacity-5 flex-shrink-0 cursor-pointer px-2"
        onClick={() => {
          if (activeOrder === order.id) {
            setActiveOrder(null);
          } else {
            setActiveOrder(order.id);
          }
        }}
      >
        <div className="flex w-2/3 justify-start items-center gap-5">
          <IconOrder />
          <DetailsOrder order={order} />
        </div>
        <Image
          src={"/icons/homepage/arrow-white.png"}
          width={20}
          height={20}
          alt="arrow"
          className={`mr-5 ${
            order.id === activeOrder && "rotate-180"
          } transition-all duration-150 ease-in-out`}
        />
      </div>
      {activeOrder === order.id && (
        <OrderProducts ordetItems={order.products} />
      )}
    </div>
  );
}
