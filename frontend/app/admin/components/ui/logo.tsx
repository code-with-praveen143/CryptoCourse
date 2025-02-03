import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <span className="font-bold text-xl">Token</span>
      <span className="text-xl font-normal text-blue-600">|</span>
      <span className="text-blue-600">Disc</span>
    </Link>
  )
}

