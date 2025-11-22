"use client";
import { useEffect, useState } from "react";

const Footer = () => {
  const [year, setYear] = useState<number | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer dir="rtl" className="bg-slate-800 text-white py-8">
      <div className="container mx-auto px-4">
        {/* === 3 Columns Layout === */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center sm:text-right">
          {/* Related Links */}
          <div>
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

          {/* Quick Links */}
          <div>
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

          {/* Contact */}
          <div>
            <h2 className="text-lg font-bold mb-2">تماس با ما</h2>
            <p className="text-sm">ایمیل: info@iamss.ir</p>
            <p className="text-sm">
              تلفن: <span dir="rtl">0903-234-2677</span>
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 border-t border-slate-600 pt-4 text-center text-sm">
          کپی رایت © {year || "2025"} : کلیه حقوق این سایت محفوظ و متعلق به
          انجمن علوم نوین شنای ایران میباشد
        </div>
      </div>
    </footer>
  );
};

export default Footer;
