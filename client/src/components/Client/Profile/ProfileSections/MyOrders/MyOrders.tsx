import { getUserOrders } from "@/src/api/OrdersApi";
import { Order } from "@/src/types/Order";
import React, { useEffect, useState } from "react";
import SingleOrder from "./SingleOrder";

export default function MyOrders() {
  const [orders, setOrders] = useState<null | Order[]>(null);
  const [loading, setLoading] = useState(true);
  const [activeOrder, setActiveOrder] = useState<null | number>(null);

  useEffect(() => {
    setLoading(true);
    const getData = async () => {
      const response = await getUserOrders();
      setOrders(response.reverse());
    };
    getData();
    setLoading(false);
  }, []);

  return (
    <div className="w-full h-full flex items-start justify-cente flex-col pl-3 gap-5">
      <h2 className="text-2xl text-black font-medium">My Orders</h2>
      <div className="w-full flex flex-col gap-3 overflow-y-auto h-full">
        {loading
          ? Array.from({ length: 5 }).map((_, key) => (
              <div
                key={key}
                className="skeleton bg-slate-100 w-full h-[60px] rounded-md shadow-sm border-black border-opacity-5 border-[1px]"
              ></div>
            ))
          : orders?.map((order: Order) => (
              <SingleOrder
                order={order}
                activeOrder={activeOrder}
                setActiveOrder={setActiveOrder}
                key={order.id}
              />
            ))}
      </div>
    </div>
  );
}
