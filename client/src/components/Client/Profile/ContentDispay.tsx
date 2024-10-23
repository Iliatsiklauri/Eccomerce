import { useSearchParams } from "next/navigation";
import React from "react";
import Settings from "./ProfileSections/Settings/Settings";
import Addresses from "./ProfileSections/Addresses/Addresses";
import MyOrders from "./ProfileSections/MyOrders/MyOrders";

export default function ContentDispay() {
  const params = useSearchParams();
  const section = params.get("section");
  return (
    <div className="w-[80%] h-full flex-shrink-0">
      {section === "settings" && <Settings />}
      {section === "delivery" && <Addresses />}
      {section === "orders" && <MyOrders />}
    </div>
  );
}
