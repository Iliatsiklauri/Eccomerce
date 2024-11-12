import { addOrderByCart } from "@/src/api/OrdersApi";
import React from "react";

type PropType = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  bg: boolean;
  setBg: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
};

export default function OrderButton({ setBg, setLoading }: PropType) {
  const handleSubmit = async () => {
    setLoading(true);

    await addOrderByCart();

    setBg(true);
    setLoading(false);
  };

  return (
    <div
      className="w-full h-[55px] btn btn-success text-white text-xl"
      onClick={handleSubmit}
    >
      ORDER
    </div>
  );
}
