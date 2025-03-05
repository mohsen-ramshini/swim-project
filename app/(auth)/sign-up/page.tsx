"use client";
import { AuthForm } from "@/components/auth/AuthForm";
import Image from "next/image";

const page = () => {
  const handleSubmit = (values: object) => {
    console.log(`submitted : ${values}`);
  };
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center bg-secondary">
      <div className="w-4/5 lg:w-2/5 h-full  flex justify-center items-center">
        <AuthForm isLogin={false} onSubmit={handleSubmit} />
      </div>
    </section>
  );
};

export default page;
