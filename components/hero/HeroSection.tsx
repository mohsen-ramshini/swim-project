import DialogContent from "./DialogContent";
import Image from "next/image";
import React from "react";

interface Props {
  title?: string;
  subtitle?: string;
  imageSourse: string;
  width: number;
  height: number;
}

const HeroSection: React.FC<Props> = ({
  title,
  subtitle,
  imageSourse,
  width,
  height,
}) => {
  return (
    <div className="relative m-auto w-full bg-slate-700 lg:h-[400px] mb-10">
      <Image
        src={`/static/images/${imageSourse}`}
        alt="Logo"
        width={width}
        height={height}
        className="w-full h-full object-cover"
      />

      {title && <DialogContent title={title} subtitle={subtitle} />}
    </div>
  );
};

export default HeroSection;
