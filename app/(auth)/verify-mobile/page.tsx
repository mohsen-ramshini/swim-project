"use client";
import { OTPForm } from "@/components/auth/OTPForm";
import Image from "next/image";
import React from "react";

const page = () => {
  const handleVerify = () => {
    console.log("submitted");
  };
  return (
    <section className="bg-secondary w-full h-screen flex flex-col justify-center items-center">
      <div className="w-full flex flex-col justify-center items-center">
        <h1 className=" text-4xl xl:text-5xl font-extrabold py-10 text-white">
          انجمن شنای ایران
        </h1>
        <Image
          src={"/static/images/logo.png"}
          alt="logo"
          width={300}
          height={100}
        />
      </div>
      <div className="w-full lg:w-2/5 mt-5">
        <OTPForm onVerify={handleVerify} />
      </div>
    </section>
  );
};

export default page;
