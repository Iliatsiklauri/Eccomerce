import { Order } from "@/src/types/Order";
import { user } from "@/src/types/User";
import Image from "next/image";
import React from "react";

type PropType = {
  user: user;
  order: Order;
};

export default function SingleOrderInfo({ user, order }: PropType) {
  return (
    <div className="flex flex-shrink-0 items-start py-2 px-3 gap-4 justify-start  h-full w-[40%] 2xl:w-[30%] text-black text-sm border-l-2 border-r-2 border-black border-opacity-15 border-dashed">
      <div className="p-1 bg-black rounded-full ">
        <Image
          src={"/icons/header/profile-user.png"}
          height={20}
          width={20}
          alt="user"
        />
      </div>
      <section className="flex items-start justify-between h-full flex-col">
        <p>
          <span className="font-semibold">Email: </span>
          {user.email}
        </p>
        <p>
          <span className="font-semibold">Fullname: </span>
          {user.fullname}
        </p>
      </section>
      <section className="w-1/2">
        <span className="font-semibold">Address: </span>
        {order.address.street}
      </section>
    </div>
  );
}
