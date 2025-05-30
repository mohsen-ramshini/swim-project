"use client";
import { AuthForm } from "@/components/auth/AuthForm";
import Image from "next/image";

const page = () => {
  const handleSubmit = (values: object) => {
    console.log(`submitted : ${values}`);
  };
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center bg-secondary">
      <h1 className="relative top-10 text-4xl font-bold text-[#172c78]">انجمن علوم نوین شنای ایران</h1>
      <div className="w-5/6 lg:w-3/5 h-full  flex justify-center items-center">
        <AuthForm isLogin={false} onSubmit={handleSubmit} />
      </div>
    </section>    
  );
};

export default page;
