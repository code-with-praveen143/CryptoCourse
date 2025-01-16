'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from "../components/ui/button"
import { Search, ChevronDown } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
 

const categories = [
  { name: 'Altcoins', href: '/categories/altcoins' },
  { name: 'Bitcoin', href: '/categories/bitcoin' },
  { name: 'Blockchain', href: '/categories/blockchain' },
  { name: 'Cryptocurrency', href: '/categories/cryptocurrency' },
  { name: 'Defi', href: '/categories/defi' },
  { name: 'Ethereum', href: '/categories/ethereum' },
  { name: 'Metaverse and Gaming', href: '/categories/metaverse' },
  { name: 'NFT', href: '/categories/nft' },
  { name: 'Security', href: '/categories/security' },
  { name: 'Trading and Analysis', href: '/categories/trading' },
]

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">swyftx</span>
            <span className="text-xl text-blue-600">Learn</span>
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
            
            <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
              <DropdownMenuTrigger className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900">
                Categories
                <ChevronDown className="ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                {categories.map((category) => (
                  <DropdownMenuItem key={category.href}>
                    <Link
                      href={category.href}
                      className="w-full text-sm"
                    >
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
            <button className="text-gray-600 hover:text-gray-900">
              <Search className="h-5 w-5" />
            </button>
            
            <Link 
              href="/signup" 
              className="hidden md:block text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              Sign up
            </Link>
            
            <Button 
              variant="outline" 
              className="hidden md:inline-flex items-center text-blue-600 border-blue-600 hover:bg-blue-50"
              asChild
            >
              <Link href="/login">
                Login
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}

