import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <section className="flex h-screen w-full">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main content */}
        <main className="flex-1 flex flex-col overflow-y-auto">
          <header className="bg-gray-100 shadow p-4">
            <SidebarTrigger className="text-gray-700" />
            <h1 className="text-lg font-semibold">Dashboard</h1>
          </header>
          <div className="flex-1 p-6 bg-gray-50">{children}</div>
        </main>
      </section>
    </SidebarProvider>
  );
}
