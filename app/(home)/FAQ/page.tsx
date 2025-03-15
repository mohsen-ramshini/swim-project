import React from "react";

const FAQPage: React.FC = () => {
  const faqs = [
    {
      question: "چگونه می‌توانم با شما همکاری کنم؟",
      answer:
        "برای همکاری با ما می‌توانید از طریق صفحه تماس با ما با ما در ارتباط باشید.",
    },
    {
      question: "آیا خدمات شما رایگان است؟",
      answer:
        "بسته به نوع خدمات، برخی از آنها رایگان و برخی دیگر شامل هزینه هستند.",
    },
    {
      question: "چگونه می‌توانم اطلاعات بیشتری دریافت کنم؟",
      answer:
        "شما می‌توانید از طریق ایمیل یا شماره تماس درج شده در سایت با ما ارتباط برقرار کنید.",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-lg w-full">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          سوالات متداول
        </h1>
        <div className="space-y-4 text-right">
          {faqs.map((faq, index) => (
            <details key={index} className="border-b pb-4 cursor-pointer">
              <summary className="text-lg font-semibold text-gray-700 focus:outline-none">
                {faq.question}
              </summary>
              <p className="text-gray-600 mt-2">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
