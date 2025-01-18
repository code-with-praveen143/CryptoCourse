'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Bitcoin, Lock } from 'lucide-react'
import Header from '../learn/components/Header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../learn/components/ui/card'
import { Input } from '../learn/components/ui/input'
import { Button } from '../learn/components/ui/button'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you'd validate credentials here
    console.log('Logging in with:', email, password)
    router.push('/courses')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-400 to-purple-500">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-12 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <Bitcoin className="h-12 w-12 text-yellow-500" />
            </div>
            <CardTitle className="text-2xl font-bold text-center">Login to CryptoLearn</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email</label>
                <Input
                  type="email"
                  id="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password</label>
                <Input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full"
                />
              </div>
              <Button type="submit" className="w-full">
                <Lock className="mr-2 h-4 w-4" /> Login
              </Button>
            </form>
            <div className="mt-4 text-center text-sm">
              <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
            </div>
          </CardContent>
        </Card>
      </main>
      <footer className="py-4 text-center text-white">
        <p>&copy; 2023 CryptoLearn. All rights reserved.</p>
      </footer>
    </div>
  )
}

