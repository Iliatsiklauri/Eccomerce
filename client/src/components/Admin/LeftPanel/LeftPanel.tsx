import React from "react";
import LeftPanelSection from "./LeftPanelSection";
import LeftHeader from "./LeftHeader";
import LogOutPanel from "./LogOutPanel";
import { panelData } from "@/src/utils/data";
import Link from "next/link";

export default function LeftPanel({
  currentSection,
}: {
  currentSection: string;
}) {
  return (
    <aside className="w-[350px] h-full bg-white flex flex-col items-start justify-start pt-10 pb-3 rounded-xl gap-[3%] flex-shrink-0 shadow-md shadow-stone-500">
      <LeftHeader />
      <div className="w-[85%] h-[1px] bg-darkBrown self-center bg-opacity-20 mt-2"></div>
      <div className="h-full flex items-center justify-start flex-col w-full px-4 gap-[2%]">
        {panelData.map((el, key) => (
          <LeftPanelSection
            image={el.imageUrl}
            name={el.name}
            key={key}
            isActive={
              currentSection ===
              (el.name === "User management" ? "Users" : el.name)
            }
          />
        ))}
      </div>
      <Link href={"/"} className="text-xl font-bold pl-4">
        Home
      </Link>
      <LogOutPanel />
    </aside>
  );
}
