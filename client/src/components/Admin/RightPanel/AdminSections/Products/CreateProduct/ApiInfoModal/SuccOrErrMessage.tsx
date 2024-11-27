import React from "react";

type PropType = {
  error: string | null;
  mode: string | null;
};

export default function SuccOrErrMessage({ error, mode }: PropType) {
  return (
    <div className="w-full text-center">
      {error ? (
        <>
          <h1 className="text-white text-xl">Something went wrong</h1>
          <h1 className="text-xl text-red-500">Error: {error}</h1>
        </>
      ) : (
        <h1 className="text-xl text-white">
          Product {mode === "edit" ? "Updated" : "Created"} Successfully!
        </h1>
      )}
    </div>
  );
}
