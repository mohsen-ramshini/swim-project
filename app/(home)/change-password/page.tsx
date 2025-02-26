"use client";
import React from "react";
import { ChangePasswordForm } from "../../../components/user/ChangePassForm";
import HeroSection from "@/components/hero/HeroSection";

const page = () => {
  const handleLog = (values: any) => {
    console.log(values);
  };
  return (
    <section className="w-full h-full">
      <HeroSection
        imageSourse={"banner-two.jpg"}
        width={20480}
        height={500}
        dialog={"سلام"}
      />
      <ChangePasswordForm onSubmit={handleLog} />
    </section>
  );
};

export default page;
