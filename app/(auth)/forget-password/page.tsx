"use client";

import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import Image from "next/image";

const Page = () => {
  const handleSubmit = (values: object) => {
    console.log(`submitted : ${values}`);
  };

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-secondary px-4 py-10">
      <h1 className="text-center text-3xl md:text-4xl font-extrabold text-[#172c78] mb-8">
        انجمن علوم نوین شنای ایران
      </h1>

      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6 sm:p-8">
        <ForgotPasswordForm />
      </div>
    </section>
  );
};

export default Page;
