"use client";

import { AuthForm } from "@/components/auth/AuthForm";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type AuthFormValues = {
  email: string;
  password: string;
};

const Page = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleSubmit = async (values: AuthFormValues) => {
    const { email, password } = values;

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("خطا در ثبت‌نام:", error.message);
      toast.error("ثبت کاربر ناموفق بود")
    } else {
      console.log("ثبت‌نام موفق:", data);
      toast.success("کاربر با موفقیت ثبت شد . لطفا ایمیل خود را چک کنید")
      router.push("/sign-in"); 
    }
  };

  return (
    <section className="w-full h-screen flex flex-col justify-center items-center bg-secondary">
      <h1 className="relative top-10 text-4xl font-bold text-white">
        انجمن علوم نوین شنای ایران
      </h1>
      <div className="w-5/6 lg:w-3/5 h-full flex justify-center items-center">
        <AuthForm isLogin={false} onSubmit={handleSubmit} />
      </div>
    </section>
  );
};

export default Page;
