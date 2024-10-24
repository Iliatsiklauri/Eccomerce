import { useSearchParams } from "next/navigation";
import React from "react";
import Settings from "./ProfileSections/Settings/Settings";
import Addresses from "./ProfileSections/Addresses/Addresses";
import MyOrders from "./ProfileSections/MyOrders/MyOrders";
import { user } from "@/src/types/User";

type PropType = {
  user: user | null;
  setSubmitted: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ContentDispay({ user, setSubmitted }: PropType) {
  const params = useSearchParams();
  const section = params.get("section");

  return (
    <div className="w-[80%] h-full flex-shrink-0">
      {section === "settings" && <Settings />}
      {section === "delivery" && (
        <Addresses user={user} setSubmitted={setSubmitted} />
      )}
      {section === "orders" && <MyOrders />}
    </div>
  );
}
