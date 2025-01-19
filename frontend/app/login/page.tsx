"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bitcoin, Eye, EyeOff, Lock, User } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "../learn/components/ui/input";
import { Button } from "../learn/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../learn/components/ui/card";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

type FormData = z.infer<typeof formSchema>;

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Function to fetch current user details
  const fetchCurrentUser = async (token: string) => {
    try {
      const response = await fetch("http://localhost:5000/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details.");
      }

      const userData = await response.json();
      setUser(userData);
    } catch (err) {
      console.error("Error fetching current user:", err);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      console.log("Result:", result);
      if (!response.ok) {
        setError(result.message || "Something went wrong.");
        return;
      }
      if (result.accessToken) {
        localStorage.setItem("user", JSON.stringify(result));
      }

      // Store the response data in localStorage
      localStorage.setItem("auth_token", result.accessToken);
      localStorage.setItem("username", result.username);
      localStorage.setItem("email", result.email);
      // Fetch and set current user details
      await fetchCurrentUser(result.accessToken);

      // Redirect to the main page
      router.push("/");
    } catch (err) {
      setError("Failed to login. Please try again later.");
      console.error("Login error:", err);
    }
  };

  // Check if the user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      fetchCurrentUser(token).then(() => {
        router.push("/");
      });
    }
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <Bitcoin className="h-12 w-12 text-yellow-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">
              Login to Token Disc
            </CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-gray-400">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="text-red-500 text-sm text-center">{error}</div>
              )}
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Username
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    className="pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                    {...register("username")}
                  />
                </div>
                {errors.username && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500"
                    {...register("password")}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-500"
                    onClick={() =>
                      setShowPassword((prevShowPassword) => !prevShowPassword)
                    }
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md shadow-md"
              >
                Login
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 text-sm">
            <div className="text-center">
              <a
                href="#"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Forgot password?
              </a>
            </div>
            <div className="text-center">
              Don't have an account?{" "}
              <a
                href="/signup"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                Sign up
              </a>
            </div>
          </CardFooter>
        </Card>
      </main>
      <footer className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>&copy; 2023 CryptoLearn. All rights reserved.</p>
      </footer>
    </div>
  );
}
