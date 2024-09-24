import React from "react";

export default function CardSkeleton() {
  return (
    <>
      {Array(20)
        .fill(null)
        .map((_, index) => (
          <div
            key={index}
            className="flex w-[250px] flex-col gap-4 h-[280px] p-2 justify-between"
          >
            <div className="skeleton h-36 w-full bg-black opacity-15 flex-shrink-0"></div>
            <div className="flex flex-col h-full items-start justify-between w-full">
              <div className="flex flex-col gap-2">
                <div className="skeleton h-4 w-28 bg-black opacity-15"></div>
                <div className="skeleton h-4 w-20 bg-black opacity-15"></div>
              </div>
              <div className="skeleton h-4 w-20 bg-black opacity-15"></div>
            </div>
          </div>
        ))}
    </>
  );
}
