import dynamic from "next/dynamic";
import React from "react";

const DashboardSection = dynamic(
  () => import("./AdminSections/Dashboard/DashboardSection")
);
const Settings = dynamic(() => import("./AdminSections/Settings/Settings"));
const MessagesSection = dynamic(
  () => import("./AdminSections/Messages/MessagesSection")
);
const UsersSection = dynamic(
  () => import("./AdminSections/UsersSection/UsersSection")
);
const ProductsSection = dynamic(
  () => import("./AdminSections/Products/ReadProducts/ProductsSection")
);
const NotificationSection = dynamic(
  () => import("./AdminSections/Notifications/NotificationSection")
);

export default function RightPanel({
  currentSection,
}: {
  currentSection: string;
}) {
  return (
    <>
      {currentSection === "Dashboard" && <DashboardSection />}
      {currentSection === "Settings" && <Settings />}
      {currentSection === "Users" && <UsersSection />}
      {currentSection === "Messages" && <MessagesSection />}
      {currentSection === "Products" && <ProductsSection />}
      {currentSection === "Notifications" && <NotificationSection />}
    </>
  );
}
