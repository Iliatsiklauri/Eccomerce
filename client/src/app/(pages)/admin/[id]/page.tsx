import LeftPanel from "@/src/components/Admin/LeftPanel/LeftPanel";
import RightPanel from "@/src/components/Admin/RightPanel/RightPanel";
import React from "react";

export type mainType = { params: { id: string } };

export default function page({ params }: mainType) {
  return (
    <main className="h-screen w-full flex items-center justify-start p-5 gap-5 bg-darkBrown">
      <LeftPanel currentSection={params.id} />
      <RightPanel currentSection={params.id} />
    </main>
  );
}
