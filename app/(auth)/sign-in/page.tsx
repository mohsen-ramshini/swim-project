"use client";
import { AuthForm } from "@/components/auth/AuthForm";
import Image from "next/image";

const Page = () => {
  const handleSubmit = (values: object) => {
    console.log(`submitted : ${values}`);
  };

  return (
    <section className="w-full min-h-screen flex flex-col justify-start items-center bg-secondary overflow-y-auto py-8">
      <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-[#172c78] text-center">
        انجمن علوم نوین شنای ایران
      </h1>
      <div className="w-5/6 lg:w-3/5 flex flex-grow justify-center items-center py-6">
        <AuthForm isLogin={true} onSubmit={handleSubmit} />
      </div>
    </section>
  );
};

export default Page;
