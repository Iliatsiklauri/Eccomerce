import Image from "next/image";
import React from "react";
import SocialIcons from "./SocialIcons";

export default function Footer() {
  return (
    <footer className="w-full h-[300px] bg-darkBrown flex items-center justify-center flex-col">
      <div className="w-full h-full  container1 flex items-center justify-between gap-4 py-8">
        <div className="h-full text-white  flex flex-col gap-2">
          <h4 className="text-xl font-sans font">About us</h4>
          <p className="pt-1 opacity-80 font-light cursor-pointer hover:underline text-[14px]">
            Careers
          </p>
          <p className="opacity-80 font-light cursor-pointer hover:underline text-[14px]">
            About eccommerce
          </p>
          <p className="opacity-80 font-light cursor-pointer hover:underline text-[14px]">
            F&Q
          </p>
          <p className="opacity-80 font-light cursor-pointer hover:underline text-[14px]">
            How to become seller
          </p>
        </div>
        <div className="h-full text-white  flex flex-col gap-2">
          <h4 className="text-xl font-sans">Terms & conditions</h4>
          <p className="opacity-80 font-light cursor-pointer hover:underline text-[14px] pt-1">
            Privacy Policy
          </p>
          <p className="opacity-80 font-light cursor-pointer hover:underline text-[14px]">
            Data security
          </p>
          <p className="opacity-80 font-light cursor-pointer hover:underline text-[14px]">
            Refund & Exchange
          </p>
        </div>
        <div className="h-full text-white  flex flex-col gap-2">
          <h4 className="text-xl font-sans">Why us?</h4>
          <p className="opacity-80 font-light cursor-pointer hover:underline text-[14px] pt-1">
            Fastest Delivery
          </p>
          <p className="opacity-80 font-light cursor-pointer hover:underline text-[14px]">
            Free Delivery Everywhere
          </p>
          <p className="opacity-80 font-light cursor-pointer hover:underline text-[14px]">
            Cheapest Prices
          </p>
          <p className="opacity-80 font-light cursor-pointer hover:underline text-[14px]">
            Free Gift Wrapping
          </p>
        </div>
        <div className="h-full text-white  flex flex-col gap-2">
          <h4 className="text-xl font-sans">Contact</h4>
          <div className="flex items-center justify-start gap-2">
            <Image
              src={"/icons/Footer/icons8-phone-number-50.png"}
              alt="phone number"
              width={15}
              height={15}
            />
            <p className="opacity-80 font-light cursor-pointer hover:underline text-[13px] pt-1 ">
              + 995 598 765 432
            </p>
          </div>
          <div className="flex items-center justify-start gap-2">
            <Image
              src={"/icons/Footer/icons8-location-50.png"}
              alt="location"
              width={15}
              height={15}
            />
            <p className="opacity-80 font-light cursor-pointer hover:underline text-[13px] pt-1">
              Rustaveli Ave, 42 Tbilisi
            </p>
          </div>
          <SocialIcons />
        </div>
      </div>
      <div className="w-full bg-black text-center text-white text-[14px] py-[2px] text-opacity-45">
        @2024 All rights reserved
      </div>
    </footer>
  );
}
