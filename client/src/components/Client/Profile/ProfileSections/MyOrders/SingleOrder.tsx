import { Order } from "@/src/types/Order";
import React from "react";
import IconOrder from "./IconOrder";
import DetailsOrder from "./DetailsOrder";
import Image from "next/image";
import OrderProducts from "./OrderProducts";
import { updateOrder } from "@/src/api/OrdersApi";

type PropType = {
  order: Order;
  setActiveOrder: React.Dispatch<React.SetStateAction<number | null>>;
  activeOrder: number | null;
  admin?: boolean;
  setTrigger?: React.Dispatch<React.SetStateAction<boolean>>;
  trigger?: boolean;
};

export default function SingleOrder({
  order,
  setTrigger,
  trigger,
  activeOrder,
  setActiveOrder,
  admin,
}: PropType) {
  const handleStatusChange = async () => {
    await updateOrder(order.orderStatus, order.id);
    if (setTrigger) {
      setTrigger(!trigger);
    }
  };
  const user = order.user;
  return (
    <div className="w-full flex flex-col gap-3">
      <div
        className={`w-full h-[70px] flex items-center justify-between rounded-md shadow-sm border-[1px] bg-slate-100 border-black  border-opacity-5 flex-shrink-0 ${
          !admin && "cursor-pointer"
        } px-2`}
        onClick={() => {
          if (!admin) {
            if (activeOrder === order.id) {
              setActiveOrder(null);
            } else {
              setActiveOrder(order.id);
            }
          }
        }}
      >
        <div
          className={`flex flex-shrink-0 ${
            admin ? "w-[40%] 2xl:w-1/3" : "w-1/2"
          } justify-start items-center gap-5`}
        >
          <IconOrder />
          <DetailsOrder order={order} admin={admin} />
        </div>
        {admin && (
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
        )}
        <div
          className={`${
            admin
              ? " items-center justify-between pl-4 relative"
              : "items-center justify-end"
          }  flex  w-full h-full `}
        >
          {admin && (
            <div
              className={` w-[100px] z-10 text-black flex items-center cursor-pointer justify-center  h-[40px] rounded-md border-black border-[1px] ${
                order.orderStatus === "pending"
                  ? "bg-yellow-500"
                  : order.orderStatus === "fullfiled"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
              onClick={handleStatusChange}
            >
              {order.orderStatus}
            </div>
          )}
          {admin && (
            <div
              className="absolute w-full h-full cursor-pointer "
              onClick={() => {
                if (admin) {
                  if (activeOrder === order.id) {
                    setActiveOrder(null);
                  } else {
                    setActiveOrder(order.id);
                  }
                }
              }}
            ></div>
          )}
          <div>
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
        </div>
      </div>
      {activeOrder === order.id && (
        <OrderProducts ordetItems={order.products} />
      )}
    </div>
  );
}
