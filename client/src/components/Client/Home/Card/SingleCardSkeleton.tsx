import React from "react";

export default function SingleCardSkeleton() {
  return (
    <div className="flex w-[260px] flex-col gap-4 h-[300px] p-2 justify-between">
      <div className="skeleton h-44 w-full bg-black opacity-15 flex-shrink-0 rounded-lg"></div>
      <div className="flex flex-col h-full items-start justify-between w-full">
        <div className="flex flex-col gap-2">
          <div className="skeleton h-4 w-28 bg-black opacity-15"></div>
          <div className="skeleton h-4 w-20 bg-black opacity-15"></div>
        </div>
        <div className="skeleton h-4 w-20 bg-black opacity-15"></div>
      </div>
    </div>
  );
}
