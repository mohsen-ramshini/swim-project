import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/appLayout/AppSidebar";
import { SheetProvider } from "@/providers/sheet-provider";
import NavBar from "@/components/appLayout/NavBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider dir="rtl">
      <section className="flex h-screen w-full">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main content */}
        <main className="flex-1 flex flex-col overflow-y-auto ">
          <NavBar />
          <header className="bg-gray-100 shadow p-4">
            <SidebarTrigger className="text-gray-700" />
            <h1 className="text-lg font-semibold">داشبورد</h1>
          </header>
          <SheetProvider />
          <div className="flex-1 p-6 bg-gray-100">{children}</div>
        </main>
      </section>
    </SidebarProvider>
  );
}
