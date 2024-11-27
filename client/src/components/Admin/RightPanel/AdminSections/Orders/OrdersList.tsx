import SingleOrder from "@/src/components/Client/Profile/ProfileSections/MyOrders/SingleOrder";
import { Order } from "@/src/types/Order";
import React, { useState } from "react";

type PropType = {
  orders: Order[] | null;
  setTrigger: React.Dispatch<React.SetStateAction<boolean>>;
  trigger: boolean;
};

export default function OrdersList({ orders, setTrigger, trigger }: PropType) {
  const [activeOrder, setActiveOrder] = useState<null | number>(null);
  const [active, setActive] = useState<null | number>(null);

  return (
    <div className="flex flex-col gap-2 overflow-y-auto h-full w-full rounded-xl justify-start items-center p-2 ">
      {orders?.map((order: Order) => (
        <SingleOrder
          active={active}
          setActive={setActive}
          setTrigger={setTrigger}
          trigger={trigger}
          order={order}
          key={order.id}
          activeOrder={activeOrder}
          setActiveOrder={setActiveOrder}
          admin
        />
      ))}
    </div>
  );
}
