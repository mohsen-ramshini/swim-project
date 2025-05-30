"use client";
import React, { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export const OTPForm: React.FC<{ onVerify: (otp: string) => void }> = ({
  onVerify,
}) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(60);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    setOtp(["", "", "", "", "", ""]);
    setTimeLeft(60);
  };

  const handleSubmit = () => {
    const otpValue = otp.join("");
    if (otpValue.length === 6) {
      onVerify(otpValue);
    }
  };

return (
  <div className="w-full flex justify-center items-center h-full px-4" /* dir="rtl" حذف شد */>
    <Card className="w-full max-w-md shadow-lg p-6" dir="rtl">
      <div className="w-full flex flex-col justify-center items-center">
        <Image
          src={"/static/images/logo.png"}
          alt="logo"
          className="max-w-[150px] max-h-[50px] sm:max-w-[250px] sm:max-h-[90px] md:max-w-[300px] md:max-h-[100px]"
          width={300}
          height={100}
        />
        <h1 className="text-xl xl:text-3xl font-extrabold py-10 text-center" dir="rtl">
          انجمن علوم نوین شنای ایران
        </h1>
      </div>
      <CardHeader className="text-center" dir="rtl">
        <CardTitle className="text-2xl font-bold">ورود با کد تایید</CardTitle>
        <p className="text-gray-600">لطفاً کد ارسال شده به شماره همراه خود را وارد کنید</p>
      </CardHeader>
      <CardContent dir="ltr">
        <div className="flex justify-center space-x-2">
          {otp.map((digit, index) => (
            <Input
              key={index}
              dir="ltr"
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              type="text"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              className="w-12 h-12 text-center text-lg font-bold border-gray-300 focus:border-primary focus:ring-primary"
              style={{ direction: "ltr", textAlign: "center" }} // حتما اینجا هم اضافه کنید
            />
          ))}
        </div>
        <Button onClick={handleSubmit} className="w-full mt-4 bg-[#172b79]">
          تایید کد
        </Button>
        <div className="text-center mt-3 text-gray-600" dir="rtl">
          {timeLeft > 0 ? (
            <p>ارسال مجدد کد در {timeLeft} ثانیه</p>
          ) : (
            <Button variant="ghost" onClick={handleResend}>
              ارسال مجدد کد
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  </div>
);


};
