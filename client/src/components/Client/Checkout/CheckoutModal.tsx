import { setCart } from "@/src/store/features/cartSlice";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";
type PropType = {
  setBg: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  id: string | undefined;
};
export default function CheckoutModal({ setBg, loading, id }: PropType) {
  const params = useSearchParams();
  const quantity = params.get("quantity");

  const dispatch = useDispatch();
  return (
    <div className="fixed w-full h-full bottom-0 top-0 z-50 left-0 right-0 flex items-center justify-center flex-shrink-0">
      <Link
        href={"/"}
        className="w-full h-full bg-black bg-opacity-25 absolute"
        onClick={() => {
          setBg(false);
          dispatch(setCart([]));
        }}
      ></Link>
      <div className="modal-box z-10 w-[45%] max-w-[500px] h-[220px] flex flex-col items-center justify-between">
        {loading ? (
          <div className="spinner"></div>
        ) : (
          <div className="w-full flex items-center justify-between h-full flex-col pt-5">
            <h1 className="text-2xl text-white font-sans">
              Your order was placed successfully !!!
            </h1>
            <div className="w-full flex items-center justify-between">
              <Link
                href={"/"}
                className="btn w-[45%] flex-shrink-0 h-[40px] btn-neutral text-white"
                onClick={() => {
                  if (!quantity) {
                    dispatch(setCart([]));
                  }
                }}
              >
                {" "}
                Go back to home page
              </Link>
              <Link
                href={`/profile/${id}?section=orders`}
                className="btn w-[45%] flex-shrink-0 h-[40px] btn-success text-white"
                onClick={() => {
                  if (!quantity) {
                    dispatch(setCart([]));
                  }
                }}
              >
                Track your orders
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
