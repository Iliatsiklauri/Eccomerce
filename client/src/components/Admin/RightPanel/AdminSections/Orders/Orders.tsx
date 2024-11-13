"use client";

import { getAllOrders } from "@/src/api/OrdersApi";
import { Order, orderStatus } from "@/src/types/Order";
import React, { useEffect, useState } from "react";
import OrdersList from "./OrdersList";
import OrderHeader from "./OrderHeader";
import Pagination from "@/src/components/Client/Home/Pagination/Pagination";
import { useRouter, useSearchParams } from "next/navigation";

export default function Orders() {
  const [orders, setOrders] = useState<null | Order[]>(null);
  const [total, setTotal] = useState<undefined | number>(undefined);
  const [trigger, setTrigger] = useState(false);

  const router = useRouter();
  const params = useSearchParams();
  const page = params.get("page") ? Number(params.get("page")) : 1;
  const status = params.get("status") as orderStatus;

  useEffect(() => {
    const getData = async () => {
      const response = await getAllOrders({ page, status });
      if (response) {
        setOrders(response.products);
        setTotal(response.total);
      }
    };
    getData();
  }, [page, trigger, status]);

  return (
    <div className="w-full h-full bg-white rounded-xl shadow-md shadow-stone-500 overflow-hidden flex items-center justify-center flex-col ">
      <OrderHeader orders={orders} total={total} />

      <OrdersList orders={orders} setTrigger={setTrigger} trigger={trigger} />
      <div className="py-2">
        <Pagination
          activePage={page}
          onChange={(newPage) => {
            router.push(`/admin/Orders?page=${newPage}`);
          }}
          total={total}
        />
      </div>
    </div>
  );
}
