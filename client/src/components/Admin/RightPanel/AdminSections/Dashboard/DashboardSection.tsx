import React from "react";

export default function DashboardSection() {
  return (
    <div className="w-full h-full rounded-xl flex flex-col xl:flex-row items-center justify-center gap-5">
      <div className="w-full h-full flex flex-col items-center justify-center xl:gap-5">
        <div className="h-1/2 w-full gap-5 hidden xl:flex">
          <div className="w-1/2 h-full rounded-xl bg-white shadow-stone-500 shadow-md"></div>
          <div className="w-1/2 h-full rounded-xl bg-white shadow-stone-500 shadow-md"></div>
        </div>
        <div className="w-full h-full xl:h-1/2 bg-white rounded-xl shadow-stone-500 shadow-md"></div>
      </div>
      <div className="w-full xl:w-[400px] h-1/2 xl:h-full bg-white rounded-xl flex-shrink-0 shadow-stone-500 shadow-md"></div>
    </div>
  );
}
