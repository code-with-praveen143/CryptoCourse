"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Bitcoin, Eye, EyeOff, Lock, User, X } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "../learn/components/ui/input"
import { Button } from "../learn/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "../learn/components/ui/card"
import Lottie from "react-lottie-player"
import rewardAnimation from "@/public/animations/reward.json"

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})

type FormData = z.infer<typeof formSchema>

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [pointsEarned, setPointsEarned] = useState<number | null>(null)
  const [showRewardPopup, setShowRewardPopup] = useState(false)
  const [user, setUser] = useState(null)
  const router = useRouter()

  const logLoginActivity = async (user_id: string) => {
    try {
      const response = await fetch("http://localhost:5000/api/quiz/loginactivity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user_id }),
      })

      if (!response.ok) {
        throw new Error("Failed to log login activity.")
      }

      const data = await response.json()
      setPointsEarned(data.pointsEarned)
      setShowRewardPopup(true) // Show reward popup
    } catch (error) {
      console.error("Error logging login activity:", error)
    }
  }

  const fetchCurrentUser = async (token: string) => {
    try {
      const response = await fetch("http://localhost:5000/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error("Failed to fetch user details.")
      }

      const userData = await response.json()
      setUser(userData)
    } catch (err) {
      console.error("Error fetching current user:", err)
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()
      console.log("Result:", result)
      if (!response.ok) {
        setError(result.message || "Something went wrong.")
        return
      }
      if (result.accessToken) {
        localStorage.setItem("user", JSON.stringify(result))
      }

      localStorage.setItem("auth_token", result.accessToken)
      localStorage.setItem("username", result.username)
      localStorage.setItem("email", result.email)
      localStorage.setItem("user_id", result.id)

      await fetchCurrentUser(result.accessToken)
      await logLoginActivity(result.id)
      setTimeout( () => {
        router.push("/")

      },3000)
     } catch (err) {
      setError("Failed to login. Please try again later.")
      console.error("Login error:", err)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("auth_token")
    if (token) {
      fetchCurrentUser(token).then(() => {
        router.push("/")
      })
    }
  }, [router])

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="w-full max-w-md shadow-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <Bitcoin className="h-12 w-12 text-yellow-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">Login to Token Disc</CardTitle>
            <CardDescription className="text-center text-gray-600 dark:text-gray-400">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && <div className="text-red-500 text-sm text-center">{error}</div>}
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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
                {errors.username && <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>}
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
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
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
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
              <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">
                Forgot password?
              </a>
            </div>
            <div className="text-center">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-600 hover:underline dark:text-blue-400">
                Sign up
              </a>
            </div>
          </CardFooter>
        </Card>
      </main>
      {showRewardPopup && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center p-4">
          <div className="relative bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <button
              onClick={() => setShowRewardPopup(false)}
              className="absolute -top-4 -right-4 bg-white text-gray-500 hover:text-gray-800 rounded-full p-2 shadow-md"
              aria-label="Close reward popup"
            >
              <X className="w-5 h-5" />
            </button>
            <Lottie loop animationData={rewardAnimation} play className="h-40 mx-auto" />
            <h2 className="text-center text-xl font-bold text-gray-800 mt-4">You've Earned {pointsEarned} Points!</h2>
            <p className="text-center text-gray-600 mt-4">
              Thanks for logging in! Continue exploring to earn more points.
            </p>
          </div>
        </div>
      )}
      <footer className="py-4 text-center text-sm text-gray-600 dark:text-gray-400">
        <p>&copy; 2023 CryptoLearn. All rights reserved.</p>
      </footer>
    </div>
  )
}

