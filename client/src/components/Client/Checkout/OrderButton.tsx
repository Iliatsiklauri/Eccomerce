import { addOrderByCart } from "@/src/api/OrdersApi";
import React from "react";

export default function OrderButton() {
  return (
    <div
      className="w-full h-[55px] btn btn-success text-white text-xl"
      onClick={async () => {
        await addOrderByCart();
      }}
    >
      ORDER
    </div>
  );
}
