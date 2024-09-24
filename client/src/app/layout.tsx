import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "../globals.css";
import StoreProvider from "../store/StoreProvider";
import { LayoutWrapper } from "../Layout/LayoutWrapper";

export const metadata: Metadata = {
  title: "Eccomerce",
  description:
    "Discover unbeatable deals on our e-commerce site, where you can shop a vast selection of products from electronics to fashion ",
};

const jost = Jost({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.className}`}>
        <StoreProvider>
          <LayoutWrapper>{children}</LayoutWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}
