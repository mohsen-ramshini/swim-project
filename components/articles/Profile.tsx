import React from "react";
import cn from "clsx";

interface ComponentSize {
  sm: { image: string; text: string; roleText: string };
  lg: { image: string; text: string; roleText: string };
  xl: { image: string; text: string; roleText: string };
}

const componentSize: ComponentSize = {
  sm: {
    image: "w-8 h-8",
    text: "text-sm",
    roleText: "text-xs",
  },
  lg: {
    image: "w-12 h-12",
    text: "text-lg",
    roleText: "text-sm",
  },
  xl: {
    image: "w-16 h-16",
    text: "text-xl",
    roleText: "text-base",
  },
};

interface Props {
  imagePath?: string;
  fullName: string;
  role?: string;
  occupation?: string;
  size: keyof ComponentSize;
}

const Profile: React.FC<Props> = ({
  imagePath,
  fullName,
  role,
  occupation,
  size,
}) => {
  const validSize = componentSize[size] ? size : "lg";

  return (
    <aside className="flex justify-start items-center flex-row-reverse space-x-reverse space-x-3 mt-1">
      {/* Profile Image */}
      <div
        className={cn(
          "bg-slate-600 rounded-full flex justify-center items-center overflow-hidden p-7",
          componentSize[validSize].image
        )}
      >
        {imagePath ? (
          <img
            src={imagePath}
            alt={fullName}
            className="w-auto h-auto max-w-full max-h-full object-cover rounded-full"
          />
        ) : (
          <span className="text-white text-xs"></span>
        )}
      </div>

      {/* Profile Details */}
      <div className="w-full flex flex-col justify-start items-end">
        {/* Name and Role */}
        <div className="flex flex-row-reverse items-baseline">
          <p className={cn("pl-2 font-bold", componentSize[validSize].text)}>
            {fullName}
          </p>
          {role && (
            <p
              className={cn(
                "font-thin text-[#525252]",
                componentSize[validSize].roleText
              )}
            >
              {role}
            </p>
          )}
        </div>

        {/* Occupation */}
        {occupation && (
          <div
            className={cn("text-gray-600", componentSize[validSize].roleText)}
          >
            {occupation}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Profile;
