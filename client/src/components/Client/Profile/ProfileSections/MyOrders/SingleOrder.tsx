import { Order, orderStatus } from "@/src/types/Order";
import React, { useState } from "react";
import IconOrder from "./IconOrder";
import DetailsOrder from "./DetailsOrder";
import Image from "next/image";
import OrderProducts from "./OrderProducts";
import { updateOrder } from "@/src/api/OrdersApi";
import SingleOrderInfo from "./SingleOrderInfo";

type PropType = {
  order: Order;
  setActiveOrder: React.Dispatch<React.SetStateAction<number | null>>;
  activeOrder?: number | null;
  admin?: boolean;
  setTrigger?: React.Dispatch<React.SetStateAction<boolean>>;
  trigger?: boolean;
  active?: null | number;
  setActive?: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function SingleOrder({
  order,
  setTrigger,
  trigger,
  activeOrder,
  setActiveOrder,
  admin,
  active,
  setActive,
}: PropType) {
  const user = order.user;
  const states = ["pending", "failed", "fullfiled"];

  const [orderStat, setOrderStat] = useState<string | orderStatus>(
    order.orderStatus
  );

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
        {admin && <SingleOrderInfo user={user} order={order} />}
        <div
          className={`${
            admin
              ? " items-center justify-between pl-4 relative"
              : "items-center justify-end"
          }  flex  w-full h-full `}
        >
          {admin && (
            <div className="w-[110px] flex items-center justify-center  bg-white rounded-lg border-black border-[1px] p-1 flex-col relative">
              <div
                className={`z-20 w-full text-black flex items-center cursor-pointer justify-center  h-[40px] rounded-md ${
                  order.orderStatus === "pending"
                    ? "bg-yellow-500"
                    : order.orderStatus === "fullfiled"
                    ? "bg-green-500"
                    : "bg-red-500"
                }`}
                onClick={() => {
                  if (setActive) {
                    if (active === order.id) {
                      setActive(null);
                    } else {
                      setActive(order.id);
                    }
                  }
                }}
              >
                <p>{orderStat}</p>
              </div>
              {active === order.id && (
                <div className="absolute bottom-[-100px] w-[115px] bg-white z-50 border-black border-[1px] rounded-lg flex flex-col items-center justify-center gap-1 p-1">
                  {states
                    .filter((el) => el !== order.orderStatus)
                    .map((str) => (
                      <div
                        key={str}
                        className={` ${
                          str === "failed"
                            ? "bg-red-500 "
                            : str === "fullfiled"
                            ? "bg-green-500"
                            : "bg-yellow-500"
                        } w-full text-sm  h-[40px] rounded-md flex items-center justify-center text-black cursor-pointer shadow-lg`}
                        onClick={async () => {
                          await updateOrder(str as orderStatus, order.id);
                          setOrderStat(str);
                          if (setActive) {
                            setActive(null);
                          }
                          if (setTrigger) {
                            setTrigger(!trigger);
                          }
                        }}
                      >
                        {str}
                      </div>
                    ))}
                </div>
              )}
            </div>
          )}
          {admin && (
            <div
              className="absolute w-full h-full cursor-pointer "
              onClick={() => {
                if (setActive) {
                  setActive(null);
                }
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
