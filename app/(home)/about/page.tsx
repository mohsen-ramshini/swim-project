import React from "react";

const AboutPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">درباره ما</h1>
        <p className="text-gray-600 mb-6">
          ما یک تیم پویا و خلاق هستیم که در زمینه توسعه وب، هوش مصنوعی و تحلیل
          داده‌ها فعالیت می‌کنیم. هدف ما ارائه راهکارهای نوآورانه و کارآمد برای
          کسب‌وکارها و افراد است.
        </p>
        <p className="text-gray-600">
          برای اطلاعات بیشتر یا همکاری با ما، می‌توانید از طریق صفحه تماس با ما
          در ارتباط باشید.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
