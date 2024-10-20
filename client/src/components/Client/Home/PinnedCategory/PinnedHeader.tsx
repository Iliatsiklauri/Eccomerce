import React from "react";
import ViewMoreButton from "./ViewMoreButton";
import Image from "next/image";

type PinnedType = {
  title: string;
  id: number;
  isPromotion?: boolean;
};

export default function PinnedHeader({ title, id, isPromotion }: PinnedType) {
  return (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center justify-center gap-3">
        {isPromotion && (
          <Image
            src={"/icons/homepage/promotions.png"}
            alt="promotions"
            width={36}
            height={36}
          />
        )}
        <p className="text-black text-2xl font-medium ml-1">{title}</p>
      </div>
      <ViewMoreButton id={id} isPromotion={isPromotion} />
    </div>
  );
}
