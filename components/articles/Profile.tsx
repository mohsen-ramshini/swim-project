import React from "react";
import cn from "clsx";

interface ComponentSize {
  xs: { image: string; text: string; roleText: string; padding: string };
  sm: { image: string; text: string; roleText: string; padding: string };
  lg: { image: string; text: string; roleText: string; padding: string };
}

const componentSize: ComponentSize = {
  xs: {
    image: "w-6 h-6",
    text: "text-xs",
    roleText: "text-[10px]",
    padding: "p-1",
  },
  sm: {
    image: "w-8 h-8",
    text: "text-sm",
    roleText: "text-xs",
    padding: "p-1.5",
  },
  lg: {
    image: "w-10 h-10",
    text: "text-base",
    roleText: "text-sm",
    padding: "p-2",
  },
};

interface Props {
  imagePath?: string;
  fullName: string;
  role?: string;
  occupation?: string;
  size?: keyof ComponentSize;
  isLoading?: boolean;
}

const Profile: React.FC<Props> = ({
  imagePath,
  fullName,
  role,
  occupation,
  size = "sm",
  isLoading = false,
}) => {
  const selected = componentSize[size];

  // 🔥 حالت loading
  if (isLoading) {
    return (
      <aside className="flex justify-start items-center flex-row-reverse space-x-reverse space-x-2 mt-1 animate-pulse">
        {/* Skeleton Image */}
        <div
          className={cn(
            "bg-gray-300 rounded-full",
            selected.image
          )}
        />

        {/* Skeleton Text */}
        <div className="flex flex-col items-end space-y-1">
          <div className={cn("bg-gray-300 rounded", "h-3 w-20")} />
          <div className={cn("bg-gray-200 rounded", "h-2 w-14")} />
        </div>
      </aside>
    );
  }

  // 🔥 حالت اصلی
  return (
    <aside className="flex justify-start items-center flex-row-reverse space-x-reverse space-x-2 mt-1">
      {/* Profile Image */}
      <div
        className={cn(
          "bg-slate-600 rounded-full flex justify-center items-center overflow-hidden",
          selected.image,
          selected.padding
        )}
      >
        {imagePath ? (
          <img
            src={imagePath}
            alt={fullName}
            className="w-full h-full object-cover rounded-full"
          />
        ) : (
          <span className="text-white text-[8px]"></span>
        )}
      </div>

      {/* Profile Details */}
      <div className="flex flex-col justify-start items-end">
        <div className="flex flex-row-reverse items-baseline">
          <p className={cn("pl-2 font-bold", selected.text)}>{fullName}</p>

          {role && (
            <p className={cn("font-thin text-[#525252]", selected.roleText)}>
              {role}
            </p>
          )}
        </div>

        {occupation && (
          <div className={cn("text-gray-600", selected.roleText)}>
            {occupation}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Profile;
