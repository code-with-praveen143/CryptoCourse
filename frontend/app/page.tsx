// File: app/page.tsx
import React from "react";
import Link from "next/link";

const HomePage = () => {
  const usename = "John Doe";
  return (
    <div className="bg-white text-black min-h-screen">
      <header className="p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">TokenDisc</h1>
          <nav className="space-x-6">
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
        </div>
      </header>

      <main className="container mx-auto mt-12 px-4">
        <h1 className="text-4xl font-bold mb-4 text-center">Hello 👋 {usename}</h1>
        <h2 className="text-center text-[26px] text-gray-400 mb-2">Welcome to the TokenDisc</h2>
        <p className="text-center text-gray-400 mb-12">
          Explore our platform to learn about cryptocurrencies, practice trading, and connect with a vibrant community.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-8 md:grid-flow-row-dense">
          {/* Learn Card */}
          <div
            className="bg-white text-black border border-gray-400 rounded-lg shadow-lg overflow-hidden bg-cover bg-center md:w-[450px] md:h-[300px]"
            style={{ backgroundImage: "url('https://res.cloudinary.com/dpzpn3dkw/image/upload/w_1600,f_auto,q_auto/v1735054562/kuxcgogc9tpyeu8sjxtb.webp?_upload_ref=ic_img_tool&__ar__=1.22')" }}
          >
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4">Learn</h3>
              <p className="text-gray-400 mb-4">
                Dive into our educational resources to understand the basics of cryptocurrencies, blockchain technology, and trading strategies.
              </p>
              <Link href="/learn">
                <span className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition">
                  Explore Learning
                </span>
              </Link>
            </div>
          </div>

          {/* Demo Trading Card */}
          <div
            className="bg-white text-black border border-gray-400 rounded-lg shadow-lg overflow-hidden bg-cover bg-center md:w-[450px] md:h-[300px]"
            style={{ backgroundImage: "url('https://res.cloudinary.com/dpzpn3dkw/image/upload/w_1600,f_auto,q_auto/v1735054562/pnwimw9r7outg8tdytsu.webp?_upload_ref=ic_img_tool&__ar__=1.22')" }}
          >
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4">Demo Trading</h3>
              <p className="text-gray-400 mb-4">
                Practice trading in a risk-free environment. Hone your skills and prepare for the real market.
              </p>
              <Link href="/demo-trading">
                <span className="inline-block bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition">
                  Start Demo Trading
                </span>
              </Link>
            </div>
          </div>

          {/* Community Card */}
          <div
            className="bg-white text-black border border-gray-400 rounded-lg shadow-lg overflow-hidden bg-cover bg-center md:w-[450px] md:h-[300px]"
            style={{ backgroundImage: "url('https://res.cloudinary.com/dpzpn3dkw/image/upload/w_1600,f_auto,q_auto/v1735054562/at5grpebjdxjzh2jiuqa.webp?_upload_ref=ic_img_tool&__ar__=1.22')" }}
          >
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4">Community</h3>
              <p className="text-gray-400 mb-4">
                Join a community of like-minded individuals. Share ideas, discuss trends, and grow together.
              </p>
              <Link href="/community">
                <span className="inline-block bg-purple-500 text-white py-2 px-4 rounded hover:bg-purple-600 transition">
                  Join Community
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
