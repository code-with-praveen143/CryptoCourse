import Link from 'next/link'
import Header from './components/Header'
import { Button } from './components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6">Welcome to Crypto Learn</h1>
        <p className="text-xl mb-8">Dive into the world of cryptocurrency and blockchain technology with our comprehensive courses.</p>
        <Button asChild>
          <Link href="/courses">Explore Courses</Link>
        </Button>
      </main>
    </div>
  )
}

