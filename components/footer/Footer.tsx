"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

const Footer = () => {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer dir="rtl" className="bg-slate-800 text-white py-8">
      <div className="container mx-auto px-4">
        {/* Links Section (دسترسی سریع and لینک های مرتبط) */}
        <div className="flex flex-wrap justify-center sm:justify-between mt-4">
          {/* Related Links Section (لینک های مرتبط) */}
          <div className="w-full sm:w-1/3 mb-4 sm:mb-0 text-center sm:text-left">
            <h2 className="text-lg font-bold mb-2">لینک های مرتبط</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a
                  href="https://www.worldaquatics.com/"
                  className="hover:underline"
                >
                  فدراسیون ورزش های آبی جهان
                </a>
              </li>
              <li>
                <a href="https://irsf.ir/" className="hover:underline">
                  فدراسیون ورزش های آبی ج.ا.ا
                </a>
              </li>
              <li>
                <a
                  href="https://tehranaquatics.ir/login"
                  className="hover:underline"
                >
                  هیات ورزش های آبی استان تهران
                </a>
              </li>
              <li>
                <a
                  href="https://www.swimacademy.ir/"
                  className="hover:underline"
                >
                  آکادمی شنا
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links Section (دسترسی سریع) and Contact Section (تماس با ما) */}
          <div className="w-full sm:w-2/3 sm:flex sm:justify-between text-center sm:text-left">
            {/* Quick Links Section (دسترسی سریع) */}
            <div className="w-full sm:w-2/3 mb-4 sm:mb-0">
              <h2 className="text-lg font-bold mb-2">دسترسی سریع</h2>
              <ul className="text-sm space-y-2">
                <li>
                  <a href="/articles" className="hover:underline">
                    مقالات
                  </a>
                </li>
                <li>
                  <a href="/books" className="hover:underline">
                    کتب و نشریات
                  </a>
                </li>
                <li>
                  <a href="/news" className="hover:underline">
                    رویداد ها و اخبار
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.swimacademy.ir/courses"
                    className="hover:underline"
                  >
                    دوره های آموزشی
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    مشاوره و سوالات علمی
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Section (تماس با ما) */}
            <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
              <h2 className="text-lg font-bold mb-2">تماس با ما</h2>
              <p className="text-sm">ایمیل: info@iamss.ir</p>
              <p className="text-sm">
                تلفن: <span dir="rtl">0903-234-2677</span>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-slate-600 pt-4 text-center text-sm">
          کپی رایت © {year ? year : "2025"} : کلیه حقوق این سایت محفوظ و متعلق
          به انجمن علوم نوین شنای ایران میباشد
        </div>
      </div>
    </footer>
  );
};

export default Footer;
