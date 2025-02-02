import DialogContent from "./DialogContent";
import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <div className="m-auto w-full  h-[620px] mb-5">
      <Image
        src="/static/images/main-banner.jpeg"
        alt="Logo"
        width={2048}
        height={30}
      />
      <DialogContent />
    </div>
  );
};

export default HeroSection;
