import DialogContent from "./DialogContent";
import Image from "next/image";
import React from "react";

interface Props {
  dialog?: string;
  imageSourse: string;
  width: number;
  height: number;
}

const HeroSection: React.FC<Props> = ({
  dialog,
  imageSourse,
  width,
  height,
}) => {
  return (
    <div className="m-auto w-full bg-slate-700 lg:h-[620px] mb-10">
      <Image
        src={`/static/images/${imageSourse}`}
        alt="Logo"
        width={width}
        height={height}
        className="w-full h-full"
      />
      {dialog && <DialogContent dialog={dialog} />}
    </div>
  );
};

export default HeroSection;
