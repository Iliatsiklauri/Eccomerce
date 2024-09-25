import React from "react";

export default function CardSkeleton() {
  return (
    <div className="flex items-center justify-center w-full flex-col gap-5">
      <header className="flex items-center justify-between w-full ml-3">
        <div className=" skeleton w-[120px] h-8 opacity-15"></div>
        <div className=" skeleton w-[120px] h-8 opacity-15"></div>
      </header>
      <div className="flex items-center justify-between w-full">
        {Array(5)
          .fill(null)
          .map((_, index) => (
            <div
              key={index}
              className="flex w-[260px] flex-col gap-4 h-[300px] p-2 justify-between"
            >
              <div className="skeleton h-44 w-full bg-black opacity-15 flex-shrink-0"></div>
              <div className="flex flex-col h-full items-start justify-between w-full">
                <div className="flex flex-col gap-2">
                  <div className="skeleton h-4 w-28 bg-black opacity-15"></div>
                  <div className="skeleton h-4 w-20 bg-black opacity-15"></div>
                </div>
                <div className="skeleton h-4 w-20 bg-black opacity-15"></div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
