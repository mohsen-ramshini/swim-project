import DialogContent from "./DialogContent";
import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <div className="m-auto w-full bg-slate-700 lg:h-[620px] mb-10">
      <Image
        src="/static/images/main-banner.jpeg"
        alt="Logo"
        width={2048}
        height={500}
        className="w-full h-full"
      />
      <DialogContent />
    </div>
  );
};

export default HeroSection;
