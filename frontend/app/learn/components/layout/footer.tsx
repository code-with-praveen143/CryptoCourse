import { Instagram, Twitter } from 'lucide-react'
import { Logo } from '../../components/ui/logo'
import Link from 'next/link'

const categories = [
  'Altcoins',
  'Bitcoin',
  'Blockchain',
  'Cryptocurrency',
  'DeFi',
  'Ethereum',
  'Metaverse and Gaming',
  'NFT',
  'Security',
  'Trading and Analysis',
]

const topArticles = [
  'Intro to Cryptocurrency',
  'What is Blockchain Technology?',
  'Crypto Investing for Beginners',
  'How to Secure Your Cryptocurrency',
  'Cryptocurrency Scams',
]

const helpfulLinks = ['Courses', 'Quizzes', 'Glossary', 'Exchange']

const support = ['Help Centre', 'Legal', 'API Docs']

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-50 to-blue-100 font-sans">
      <div className="container mx-auto px-6 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and Address Section */}
          <div>
            <Logo />
            <p className="mt-4 text-sm text-gray-700">
              Milton, Brisbane,
              <br />
              Queensland, 4064
            </p>
            <div className="flex gap-4 mt-6">
              <Link
                href="#"
                className="text-gray-500 hover:text-blue-600 transition-all duration-300"
              >
                {/* Example social media icons */}
                <Twitter />
              </Link>
              <Link
                href="#"
                className="text-gray-500 hover:text-blue-600 transition-all duration-300"
              >
               <Instagram />
              </Link>
            </div>
          </div>

          {/* Categories Section */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category}>
                  <Link
                    href={`/categories/${category.toLowerCase()}`}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-all duration-300"
                  >
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Articles Section */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-4">Top Articles</h3>
            <ul className="space-y-2">
              {topArticles.map((article) => (
                <li key={article}>
                  <Link
                    href={`/articles/${article.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-sm text-gray-600 hover:text-blue-600 transition-all duration-300"
                  >
                    {article}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Helpful Links and Support Section */}
          <div className="space-y-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Helpful Links</h3>
              <ul className="space-y-2">
                {helpfulLinks.map((link) => (
                  <li key={link}>
                    <Link
                      href={`/${link.toLowerCase()}`}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-all duration-300"
                    >
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Support</h3>
              <ul className="space-y-2">
                {support.map((item) => (
                  <li key={item}>
                    <Link
                      href={`/support/${item.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-sm text-gray-600 hover:text-blue-600 transition-all duration-300"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 pt-8 border-t border-gray-300 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-600">© 2025 Token Disc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              href="/privacy-policy"
              className="text-sm text-gray-600 hover:text-blue-600 transition-all duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms-of-use"
              className="text-sm text-gray-600 hover:text-blue-600 transition-all duration-300"
            >
              Terms of Use
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
