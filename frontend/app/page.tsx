// File: app/page.tsx
"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, Gift, LogOut, Settings, UserCircle, X } from "lucide-react";
import Lottie from "react-lottie-player";
import rewardAnimation from "../public/animations/reward.json";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./learn/components/ui/dropdown-menu";
import Profile from "../public/images/Profile.jpeg";
import { useRouter } from "next/navigation";
import { BASE_URL } from "./utils/constants";

const cardData = [
  {
    title: "Learn",
    description:
      "Dive into our educational resources to understand the basics of cryptocurrencies, blockchain technology, and trading strategies.",
    image:
      "https://res.cloudinary.com/dpzpn3dkw/image/upload/w_1600,f_auto,q_auto/v1735054562/kuxcgogc9tpyeu8sjxtb.webp?_upload_ref=ic_img_tool&__ar__=1.22",
    link: "/learn",
    buttonColor: "bg-blue-500 hover:bg-blue-600",
    buttonText: "Explore Learning",
  },
  {
    title: "Demo Trading",
    description:
      "Practice trading in a risk-free environment. Hone your skills and prepare for the real market.",
    image:
      "https://res.cloudinary.com/dpzpn3dkw/image/upload/w_1600,f_auto,q_auto/v1735054562/pnwimw9r7outg8tdytsu.webp?_upload_ref=ic_img_tool&__ar__=1.22",
    link: "/demo-trading",
    buttonColor: "bg-green-500 hover:bg-green-600",
    buttonText: "Start Demo Trading",
  },
  {
    title: "Community",
    description:
      "Join a community of like-minded individuals. Share ideas, discuss trends, and grow together.",
    image:
      "https://res.cloudinary.com/dpzpn3dkw/image/upload/w_1600,f_auto,q_auto/v1735054562/at5grpebjdxjzh2jiuqa.webp?_upload_ref=ic_img_tool&__ar__=1.22",
    link: "/community",
    buttonColor: "bg-purple-500 hover:bg-purple-600",
    buttonText: "Join Community",
  },
];

const HomePage = () => {
  const [user, setUser] = useState({ username: "Guest", email: "", points: 0 });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

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
          setUser((prev) => ({ ...prev, points: data.balance }));
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

    // Check if the user is logged in
    const authToken = localStorage.getItem("auth_token");
    if (authToken) {
      setIsLoggedIn(true);
    }

    if (userId) {
      fetchPoints(userId);
    }

    setUser((prev) => ({ ...prev, username, email }));
  }, [fetchPoints]);

  const handleLogout = async () => {
    try {
      // Call the backend logout endpoint
      const response = await fetch(`${BASE_URL}/auth/logout`, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("auth_token")}`,
        },
      });

      if (response.ok) {
        // Clear local storage
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("user");
        localStorage.removeItem("user_id");

        // Update state
        setUser({ username: "Guest", email: "", points: 0 });
        setIsLoggedIn(false);

        // Redirect to login page
        router.push("/login");
      } else {
        console.error("Logout failed:", response.statusText);
      }
    } catch (error: any) {
      console.error("Error during logout:", error.message);
    }
  };

  return (
    <div className="bg-white text-black min-h-screen">
      {/* Header */}
      <header className="p-4 shadow-lg bg-white">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <h1 className="text-2xl font-bold">TokenDisc</h1>
          {/* Navbar */}
          <nav className="hidden md:flex space-x-6">
            <Link href="/learn">
              <span className="hover:text-blue-400">Learn</span>
            </Link>
            <Link href="/demo-trading">
              <span className="hover:text-blue-400">Demo Trading</span>
            </Link>
            <Link href="/community">
              <span className="hover:text-blue-400">Community</span>
            </Link>
          </nav>
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
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {isLoggedIn ? (
                  <>
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
                    <DropdownMenuItem className="flex items-center space-x-2">
                      <Gift className="w-4 h-4" />
                      <button
                        onClick={() => setShowPopup(true)}
                        className="text-sm w-full text-left"
                      >
                        Points
                      </button>
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem className="flex items-center space-x-2">
                    <UserCircle className="w-4 h-4" />
                    <Link href="/login" className="text-sm">
                      Login
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {/* Mobile Navbar */}
        <nav className="flex md:hidden mt-4 justify-center space-x-4">
          <Link href="/learn">
            <span className="hover:text-blue-400">Learn</span>
          </Link>
          <Link href="/demo-trading">
            <span className="hover:text-blue-400">Demo Trading</span>
          </Link>
          <Link href="/community">
            <span className="hover:text-blue-400">Community</span>
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container mx-auto mt-12 px-4">
        <h1 className="text-4xl font-bold mb-4 text-center">
          Hello 👋 {user.username}
        </h1>
        <h2 className="text-center text-[26px] text-gray-400 mb-2">
          Welcome to the TokenDisc
        </h2>
        <p className="text-center text-gray-400 mb-12">
          Explore our platform to learn about cryptocurrencies, practice
          trading, and connect with a vibrant community.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="bg-white text-black border border-gray-400 rounded-lg shadow-lg overflow-hidden bg-cover bg-center"
              style={{
                backgroundImage: `url(${card.image})`,
                width: "100%",
                height: "300px",
              }}
            >
              <div className="p-6 h-full flex flex-col justify-start">
                <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
                <p className="text-gray-400 mb-4">{card.description}</p>
                <Link href={card.link}>
                  <span
                    className={`inline-block py-2 px-4 rounded text-white ${card.buttonColor}`}
                  >
                    {card.buttonText}
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
        {showPopup && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center p-4">
            <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
              <button
                onClick={() => setShowPopup(false)}
                className="absolute -top-4 -right-4 bg-white text-gray-500 hover:text-gray-800 rounded-full p-2 shadow-md"
                aria-label="Close points popup"
              >
                <X className="w-5 h-5" />
              </button>
              <Lottie loop animationData={rewardAnimation} play className="h-40 mx-auto" />
              <h2 className="text-center text-xl font-bold text-gray-800 mt-4">Available Points: {user.points}</h2>
              <p className="text-center text-gray-600 mt-4">
                Earn more points by exploring our learning portal or redeem your points for exciting rewards!
              </p>
              <div className="flex justify-around mt-6">
                <Link href="/learn">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                    Learn More
                  </button>
                </Link>
                <Link href="/redeem">
                  <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
                    Redeem Points
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;