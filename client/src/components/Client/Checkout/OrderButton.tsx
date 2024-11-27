import { addOrderByCart, addOrderById } from "@/src/api/OrdersApi";
import { Product } from "@/src/types/Product";
import React from "react";

type PropType = {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setBg: React.Dispatch<React.SetStateAction<boolean>>;
  product?: Product | null;
  quantity?: number;
};

export default function OrderButton({
  setBg,
  setLoading,
  product,
  quantity,
}: PropType) {
  const handleSubmit = async () => {
    setLoading(true);
    if (product) {
      await addOrderById(product.id, Number(quantity));
    } else {
      await addOrderByCart();
    }

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
