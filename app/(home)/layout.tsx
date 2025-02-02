import Footer from "./components/Footer";
import NavBar from "./components/Navbar";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <NavBar />
        <Toaster />
        {children}
        <Footer />
      </body>
    </html>
  );
}
