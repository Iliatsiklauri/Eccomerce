import { useRouter } from "next/navigation";
import React from "react";

export default function ModeChangeButton({
  mode,
  setMode,
}: {
  mode: boolean;
  setMode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const router = useRouter();
  return (
    <div className="w-full h-[48px] bg-gray-200 rounded-3xl flex items-center justify-center text-black relative flex-shrink-0">
      <div
        className={`flex items-center justify-center w-1/2 cursor-pointer h-full rounded-3xl z-10 transition-all ease-in-out duration-300 text-md font-medium ${
          mode ? "text-white" : ""
        }`}
        onClick={() => {
          router.push("/auth?mode=register");
          setMode(true);
        }}
      >
        Sign up
      </div>
      <div
        className={`flex items-center rounded-3xl justify-center w-1/2 cursor-pointer h-full z-10 transition-all ease-in-out duration-300 font-medium ${
          mode ? "" : "text-white"
        } `}
        onClick={() => {
          router.push("/auth?mode=login");
          setMode(false);
        }}
      >
        Sign in
      </div>
      <div
        className={`w-1/2 absolute h-full transition-transform ease-in-out duration-300 rounded-3xl bg-black z-0 ${
          !mode ? "translate-x-[50%]" : "translate-x-[-50%]"
        }`}
      ></div>
    </div>
  );
}
