"use client";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import Image from "next/image";

const page = () => {
  const handleSubmit = (values: object) => {
    console.log(`submitted : ${values}`);
  };
  return (
    <section className="w-full h-screen flex flex-col justify-center items-center bg-secondary">
      <div className="w-5/6 lg:w-2/5 h-full  flex justify-center items-center">
        <ForgotPasswordForm />
      </div>
    </section>
  );
};

export default page;
