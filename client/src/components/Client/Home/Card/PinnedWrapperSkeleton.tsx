import React from "react";
import CardSkeleton from "./CardSkeleton";

export default function PinnedWrapperSkeleton() {
  return (
    <div className="flex items-center justify-center w-full flex-col gap-5">
      <CardSkeleton />
      <CardSkeleton />
    </div>
  );
}
