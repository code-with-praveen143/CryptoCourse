"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, LogOut, Settings } from "lucide-react";

import Image from "next/image";
import Profile from "../../../public/images/Profile.jpeg";
import { useRouter } from "next/navigation";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/learn/components/ui/dropdown-menu";
const categories = [
  { name: "Altcoins", href: "/categories/altcoins" },
  { name: "Bitcoin", href: "/categories/bitcoin" },
  { name: "Blockchain", href: "/categories/blockchain" },
  { name: "Cryptocurrency", href: "/categories/cryptocurrency" },
  { name: "Defi", href: "/categories/defi" },
  { name: "Ethereum", href: "/categories/ethereum" },
  { name: "Metaverse and Gaming", href: "/categories/metaverse" },
  { name: "NFT", href: "/categories/nft" },
  { name: "Security", href: "/categories/security" },
  { name: "Trading and Analysis", href: "/categories/trading" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState({ username: "Guest", email: "" });
  const router = useRouter();
  useEffect(() => {
    // Fetch user details from localStorage
    const username = localStorage.getItem("username") || "Guest";
    const email = localStorage.getItem("email") || "";
    setUser({ username, email });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
    setUser({ username: "Guest", email: "" });
    router.push('/login');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-[32px] font-bold font-sans">Token</span>
            <span className="text-xl font-norma text-blue-600">|</span>
            <span className="text-[28px] text-blue-600">Disc</span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/demo-trading/dashboard"
              className="text-md hover:underline hover:text-[#1113d4] font-medium text-gray-800"
            >
              Dashboard
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-6">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 space-x-2">
                <Image
                  src={Profile}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                <span>{user.username}</span>
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem className="flex items-center space-x-2">
                  <Settings className="w-4 h-4" />
                  <Link href="/settings" className="text-sm">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center space-x-2">
                  <LogOut className="w-4 h-4" />
                  <button
                    onClick={handleLogout}
                    className="text-sm w-full text-left"
                  >
                    Logout
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}
