import DialogContent from "./DialogContent";
import Image from "next/image";
import React from "react";

const SwimBanner = () => {
  return (
    <div className="m-auto w-full">
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

export default SwimBanner;
