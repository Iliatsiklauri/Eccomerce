import React from "react";
import CardSkeleton from "../Home/Card/CardSkeleton";

type PropType = {
  showheader?: boolean;
};

export default function ProductsListSkeleton({ showheader }: PropType) {
  return (
    <>
      <CardSkeleton showHeader={showheader} />
      <CardSkeleton showHeader={showheader} />
      <CardSkeleton showHeader={showheader} />
      <CardSkeleton showHeader={showheader} />
    </>
  );
}
