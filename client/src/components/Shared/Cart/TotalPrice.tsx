import React from "react";
type PropType = {
  total: number;
};
export default function TotalPrice({ total }: PropType) {
  return (
    <div className="w-full  px-3 py-2 flex items-center justify-between">
      <p className="text-black text-[15px font-medium">
        Total:
        <span className="text-medium font-medium"> {total}$</span>
      </p>
      <div className="btn btn-sm text-white btn-success">Checkout</div>
    </div>
  );
}
