import React from "react";
import CardSkeleton from "../Home/Card/CardSkeleton";

type PropType = {
  showheader?: boolean;
  less?: boolean;
};

export default function ProductsListSkeleton({ showheader, less }: PropType) {
  return (
    <>
      <CardSkeleton showHeader={showheader} less={less} />
      <CardSkeleton showHeader={showheader} less={less} />
      <CardSkeleton showHeader={showheader} less={less} />
      <CardSkeleton showHeader={showheader} less={less} />
      <CardSkeleton showHeader={showheader} less={less} />
    </>
  );
}
