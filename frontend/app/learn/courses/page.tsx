import Header from '../components/Header'
import Link from 'next/link'
import Image from 'next/image'
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "../components/ui/card"
import { Clock, BookOpen } from 'lucide-react'

const courses = [
  { 
    id: "1", 
    title: 'Intro to Cryptocurrency',
    description: 'An introduction to the world of cryptocurrency, covering topics like how crypto works, investing strategies, and mistakes to avoid.',
    image: 'https://learn.swyftx.com/wp-content/uploads/2022/07/Introduction-to-cryptocurrency-500x333.png',
    level: 'Beginner',
    lessons: 5,
    duration: 46,
    color: 'bg-blue-500'
  },
  { 
    id: "2", 
    title: 'Intro to Bitcoin',
    description: 'An introduction to Bitcoin, which covers what Bitcoin is and how it works, as well as exploring topics such as Bitcoin mining and Bitcoin halving.',
    image: 'https://learn.swyftx.com/wp-content/uploads/2022/07/Intro-to-bitcoin-500x333.png',
    level: 'Beginner',
    lessons: 2,
    duration: 27,
    color: 'bg-green-800'
  },
  { 
    id: "3", 
    title: 'Trading and Analysis',
    description: 'A look at trading and analysis, exploring topics like market cycles, trading strategies, technical analysis, and fundamental analysis.',
    image: 'https://learn.swyftx.com/wp-content/uploads/2023/05/Trading-and-analysis-500x333.png',
    level: 'Intermediate',
    lessons: 5,
    duration: 65,
    color: 'bg-amber-200'
  }
]

export default function Courses() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8 text-center text-black">Available Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-gray-500">
          {courses.map((course) => (
            <Link key={course.title} href={`/courses/${course.id}`}>
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg h-full">
                <div className={`relative h-48 ${course.color}`}>
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-contain p-4"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl font-semibold">{course.title}</CardTitle>
                  <CardDescription className="text-sm line-clamp-3">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium
                        ${course.level === 'Beginner' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                        {course.level}
                      </span>
                      <div className="flex items-center gap-1">
                        <BookOpen className="w-4 h-4" />
                        <span>{course.lessons} Lessons</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration} minutes</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}

