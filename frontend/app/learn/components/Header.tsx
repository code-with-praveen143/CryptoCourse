"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ChevronDown, LogOut, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Image from "next/image";
import Profile from "../../../public/images/Profile.jpeg";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/app/utils/constants";


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
  const [user, setUser] = useState({
    username: "Guest",
    email: "",
    balance: 0,
  });
  const router = useRouter();

  const fetchPoints = useCallback(async (user_id) => {
    try {
      const response = await fetch(
        `${BASE_URL}/user/points/${user_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        if (data.balance !== undefined) {
          setUser((prev) => ({ ...prev, balance: data.balance }));
        }
      } else {
        console.error("Failed to fetch user points:", response.statusText);
      }
    } catch (error: any) {
      console.error("Error fetching user points:", error.message);
    }
  }, []);

  useEffect(() => {
    // Fetch user details from localStorage
    const username = localStorage.getItem("username") || "Guest";
    const email = localStorage.getItem("email") || "";
    const userId = localStorage.getItem("user_id");  
    if (userId) {
      fetchPoints(userId);
    }

    setUser((prev) => ({ ...prev, username, email }));
  }, [fetchPoints]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user");
    setUser({ username: "Guest", email: "", balance: 0 });
    router.push("/login");
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
              href="/learn-and-earn"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Learn and Earn
              <span className="ml-1 inline-flex items-center rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800">
                New
              </span>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                Categories
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {categories.map((category) => (
                  <DropdownMenuItem key={category.href}>
                    <Link href={category.href} className="w-full text-sm">
                      {category.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/courses"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Courses
            </Link>

            <Link
              href="/analysis"
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Analysis
            </Link>
          </nav>

          {/* Right side */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 text-sm font-medium">Points:</span>
              <span className="text-blue-600 text-sm font-bold">
                {user.balance}
              </span>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 space-x-2">
                <Image
                  src={Profile}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
                {/* <span>{user.username}</span>
                <ChevronDown className="h-4 w-4" /> */}
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
