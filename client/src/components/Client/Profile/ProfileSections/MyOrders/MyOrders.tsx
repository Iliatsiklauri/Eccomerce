import { getUserOrders } from "@/src/api/OrdersApi";
import { Order } from "@/src/types/Order";
import React, { useEffect, useState } from "react";

export default function MyOrders() {
  const [orders, setOrders] = useState<null | Order[]>(null);
  useEffect(() => {
    const getData = async () => {
      const response = await getUserOrders();
      setOrders(response);
    };
    getData();
  }, []);
  return (
    <div className="w-full h-full flex items-center justify-center">
      {orders?.map((el: Order) => (
        <div className="border-2 border-black w-full p-2" key={el.id}>
          <p>{el.id}</p>
        </div>
      ))}
    </div>
  );
}
