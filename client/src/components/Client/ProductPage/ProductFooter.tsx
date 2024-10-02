import React from "react";

export default function ProductFooter() {
  return (
    <footer className="w-full flex flex-col gap-4">
      <h2 className="text-black text-xl">Simmilar products</h2>
      <div className="h-[150px] w-full bg-slate-100 rounded-xl grid grid-cols-4 gap-x-3">
        <div className="w-full h-full rounded-xl bg-slate-300"></div>
        <div className="w-full h-full rounded-xl bg-slate-300"></div>
        <div className="w-full h-full rounded-xl bg-slate-300"></div>
        <div className="w-full h-full rounded-xl bg-slate-300"></div>
      </div>
    </footer>
  );
}
