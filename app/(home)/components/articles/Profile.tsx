import React from "react";

const Profile = () => {
  return (
    <aside className=" flex justify-start items-center flex-row-reverse">
      <div className="w-11 h-11 bg-slate-600 rounded-full ml-5 pl-10"></div>
      <div className="w-full flex flex-col justify-start items-end">
        <div className="flex flex-row-reverse items-baseline">
          <p className="pl-2 font-bold text-xl">دکتر محمد بخشی</p>
          <p className="text-sm font-thin text-[#525252]">نویسنده</p>
        </div>
        <div className="">استاد دانشگاه</div>
      </div>
    </aside>
  );
};

export default Profile;
