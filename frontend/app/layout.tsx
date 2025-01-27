"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      setIsAuthenticated(true);
    } else if (pathname !== "/login" && pathname !== "/signup") {
      router.push("/login");
    }
  }, [pathname, router]);

  return (
    <html lang="en">
      <body className={inter.className}>
        {/* Allow access to login and signup pages without authentication */}
        {isAuthenticated || pathname === "/login"  ? (
          children
        ) : null}
      </body>
    </html>
  );
}