"use client";

import { AuthForm } from "@/components/auth/AuthForm";
import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie"; 

const Page = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    setErrorMsg(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      console.error("Error signing in:", error);
      toast.error("ورود کاربر ناموفق")
    } else {
      console.log("User signed in:", data.user);
      toast.success("کاربر با موفقیت وارد شد")

      // ✅ ست کردن کوکی نقش
      Cookies.set("role", "authenticated", { path: "/", expires: 1 }); // 1 روز اعتبار

      router.push("/");
    }
  };

  return (
    <section className="w-full min-h-screen flex flex-col justify-start items-center bg-secondary overflow-y-auto py-8">
      <h1 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center">
        انجمن علوم نوین شنای ایران
      </h1>
      <div className="w-5/6 lg:w-3/5 flex flex-grow justify-center items-center py-6">
        <AuthForm isLogin={true} onSubmit={handleSubmit} />
      </div>
    </section>
  );
};

export default Page;
