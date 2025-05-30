"use client";

import UpdatePasswordPage from "@/components/auth/UpdatePasswordForm";



const Page = () => {
  const handleSubmit = (values: { email: string }) => {
    console.log("ایمیل ارسال شده برای بازیابی رمز:", values.email);
    // اینجا می‌تونی درخواست به supabase یا سرور خودت بزنی
  };

  return (
    <section className="min-h-screen w-full flex flex-col items-center justify-center bg-secondary px-4 py-10">
      <h1 className="text-center text-3xl md:text-4xl font-extrabold text-white mb-8">
        انجمن علوم نوین شنای ایران
      </h1>

      <div className="w-full max-w-md bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6 sm:p-8">
        <UpdatePasswordPage />
      </div>
    </section>
  );
};

export default Page;
