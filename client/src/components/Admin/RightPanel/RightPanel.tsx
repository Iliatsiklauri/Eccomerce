import dynamic from "next/dynamic";
import React from "react";
import Orders from "./AdminSections/Orders/Orders";
import CategoryList from "./AdminSections/Category/CategoryList";

const MessagesSection = dynamic(
  () => import("./AdminSections/Messages/MessagesSection")
);
const UsersSection = dynamic(
  () => import("./AdminSections/UsersSection/UsersSection")
);
const ProductsSection = dynamic(
  () => import("./AdminSections/Products/ReadProducts/ProductsSection")
);

export default function RightPanel({
  currentSection,
}: {
  currentSection: string;
}) {
  return (
    <>
      {currentSection === "Orders" && <Orders />}
      {currentSection === "Users" && <UsersSection />}
      {currentSection === "Messages" && <MessagesSection />}
      {currentSection === "Products" && <ProductsSection />}
      {currentSection === "Categories" && <CategoryList />}
    </>
  );
}
