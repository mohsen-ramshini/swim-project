import React from "react";
import cn from "clsx"; // Import clsx for conditional classNames

interface ComponentSize {
  sm: {
    image: string;
    text: string;
    roleText: string;
  };
  lg: {
    image: string;
    text: string;
    roleText: string;
  };
  xl: {
    image: string;
    text: string;
    roleText: string;
  };
}

const componentSize: ComponentSize = {
  sm: {
    image: "w-8 h-8", // Small image
    text: "text-sm", // Small text
    roleText: "text-xs", // Small role text
  },
  lg: {
    image: "w-12 h-12", // Large image
    text: "text-lg", // Large text
    roleText: "text-sm", // Large role text
  },
  xl: {
    image: "w-16 h-16", // Extra-large image
    text: "text-xl", // Extra-large text
    roleText: "text-base", // Extra-large role text
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
          "bg-slate-600 rounded-full flex justify-center items-center p-7",
          componentSize[validSize].image
        )}
      >
        {imagePath ? (
          <img
            src={imagePath}
            alt={fullName}
            className="rounded-full w-full h-full object-cover"
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
