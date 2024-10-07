import React from "react";

export default function FormFileAndSubmit() {
  return (
    <div className="flex items-center justify-between w-full h-[60px] absolute bottom-10 right-0 pl-6">
      <button
        className="w-full h-full bg-green-600 rounded-md text-center text-white text-xl font-medium cursor-pointer hover:bg-green-500 btn border-none"
        type="submit"
      >
        CREATE PRODUCT
      </button>
    </div>
  );
}
