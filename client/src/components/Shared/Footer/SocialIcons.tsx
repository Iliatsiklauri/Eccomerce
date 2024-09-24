import Image from "next/image";
import React from "react";
const iconsData = ["instagram", "facebook", "youtube", "tik-tok"];
export default function SocialIcons() {
  return (
    <div className="flex items-center justify-start gap-3 pt-5">
      {iconsData.map((el, _) => (
        <div className="flex items-center justify-center bg-white cursor-pointer w-[28px] h-[28px] rounded-full">
          <Image
            src={`/icons/Footer/${el}.png`}
            alt={el}
            width={18}
            height={18}
          />
        </div>
      ))}
    </div>
  );
}
