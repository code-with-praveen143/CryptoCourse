import { Button } from '../../components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="max-w-xl">
            <h1 className="sm:text-[40px] font-light font-sans tracking-tight text-[#13151b]">
              Welcome to Swyftx Learn
            </h1>
            <p className="mt-4 text-[16px] font-sans text-[#000]">
              There is a vast world of information about cryptocurrency and blockchain. Access a full platform full of high-quality, crypto-related resources and insights.
            </p>
            <div className="mt-8">
              <Button asChild size="lg" className='bg-[#1113d4] border hover:border-[#1113d4] hover:bg-[#ffffff] text-[#ffffff] hover:text-[#1113d4]'>
                <Link href="/courses">Get started</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-64 sm:h-80 lg:h-96">
            <Image
              src="https://learn.swyftx.com/wp-content/uploads/2024/05/Learn-hero.png"
              alt="Crypto learning illustration"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

