import React from "react";
import ViewMoreButton from "./ViewMoreButton";

type PinnedType = {
  title: string;
  id: number;
};

export default function PinnedHeader({ title, id }: PinnedType) {
  return (
    <div className="w-full flex items-center justify-between">
      <p className="text-black text-2xl font-medium ml-1">{title}</p>
      <ViewMoreButton id={id} />
    </div>
  );
}
