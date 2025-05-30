import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex flex-col md:flex-row justify-center items-center bg-secondary">
      {/* این بخش فقط در مدیوم و بالاتر دیده می‌شود */}
      <div className="hidden md:flex w-1/2 h-screen justify-center items-center">
        <div
          className="w-[99%] h-[99%] bg-cover bg-center rounded-lg shadow-lg"
          style={{ backgroundImage: 'url("/static/images/auth-banner.jpg")' }}
        >
          <div className="w-36 h-20 bg-white/30 backdrop-blur-md flex justify-center items-center rounded-md m-5">
            <Image
              src={"/static/images/logo.png"}
              alt="logo"
              className="max-w-[150px] max-h-[50px] sm:max-w-[250px] sm:max-h-[90px] md:max-w-[300px] md:max-h-[100px]"
              width={150}
              height={70}
            />
          </div>
        </div>
      </div>

      {/* این بخش همیشه دیده می‌شود و در موبایل تمام عرض را می‌گیرد */}
      <div className="w-full md:w-1/2 h-full">
        {children}
      </div>
    </div>
  );
}
