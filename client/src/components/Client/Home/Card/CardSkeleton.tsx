import React from "react";
import SingleCardSkeleton from "./SingleCardSkeleton";

type PropType = {
  showHeader?: boolean;
  less?: boolean;
};
export default function CardSkeleton({ showHeader, less }: PropType) {
  return (
    <div
      className={`flex ${
        less ? "items-end mt-10" : "items-center"
      } justify-center w-full flex-col gap-5 `}
    >
      {!showHeader && (
        <header className="flex items-center justify-between w-full mx-3">
          <div className=" skeleton w-[120px] h-8 opacity-15"></div>
          <div className=" skeleton w-[120px] h-8 opacity-15"></div>
        </header>
      )}
      <div
        className={` flex items-center justify-center ${
          less ? "w-[80%]" : "w-full"
        } `}
      >
        {Array(less ? 4 : 5)
          .fill(null)
          .map((_, index) => (
            <SingleCardSkeleton key={index} />
          ))}
      </div>
    </div>
  );
}
