import { Sidebar } from "../admin/components/layout/sidebar";
import { Navbar } from "../admin/components/layout/navbar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <Navbar />

        {/* Dynamic Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
