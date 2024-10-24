import AuthModal from "@/src/components/Shared/Auth/AuthModal";
import WelcomeText from "@/src/components/Shared/Auth/WelcomeText";
import React, { Suspense } from "react";

export default function page() {
  return (
    <div className="flex items-center justify-center h-screen bg-darkBrown w-full xl:px-32 relative">
      <div className="container flex items-center lg:items-start justify-center xl:justify-between h-full w-full">
        <Suspense>
          <AuthModal />
        </Suspense>
        <WelcomeText />
      </div>
    </div>
  );
}
