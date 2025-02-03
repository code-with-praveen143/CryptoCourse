import Link from "next/link";
import { Home, Users, Settings } from "lucide-react";

export function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gray-900 text-white flex flex-col">
      <div className="p-4 text-xl font-bold">Admin Dashboard</div>

      <nav className="flex-1 p-4">
        <ul className="space-y-3">
          <li>
            <Link href="/admin">
              <div className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-md cursor-pointer">
                <Home size={18} /> Dashboard
              </div>
            </Link>
          </li>
          <li>
            <Link href="/admin/users">
              <div className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-md cursor-pointer">
                <Users size={18} /> Users
              </div>
            </Link>
          </li>
          <li>
            <Link href="/admin/settings">
              <div className="flex items-center gap-3 p-3 hover:bg-gray-700 rounded-md cursor-pointer">
                <Settings size={18} /> Settings
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
