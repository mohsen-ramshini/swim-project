"use client"; // This makes the component a Client Component

import React from "react";
import { ProfileForm } from "../../../components/profile/ProfileForm";
import Profile from "@/components/articles/Profile";
import HeroSection from "@/components/hero/HeroSection";

const Page = () => {
  const handleLog = (values: any) => {
    console.log(values);
  };

  return (
    <section className="w-full h-full">
      <HeroSection imageSourse={"banner-one.jpg"} width={2048} height={500} />
      <div className="w-full">
        <ProfileForm onSubmit={handleLog} />
      </div>
    </section>
  );
};

export default Page;
