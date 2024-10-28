import React from "react";
import CardSkeleton from "../Home/Card/CardSkeleton";

type PropType = {
  showheader?: boolean;
  less?: boolean;
  width?: boolean;
};

export default function ProductsListSkeleton({
  showheader,
  less,
  width,
}: PropType) {
  return (
    <>
      <CardSkeleton showHeader={showheader} less={less} width={width} />
      <CardSkeleton showHeader={showheader} less={less} width={width} />
      <CardSkeleton showHeader={showheader} less={less} width={width} />
      <CardSkeleton showHeader={showheader} less={less} width={width} />
      <CardSkeleton showHeader={showheader} less={less} width={width} />
    </>
  );
}
