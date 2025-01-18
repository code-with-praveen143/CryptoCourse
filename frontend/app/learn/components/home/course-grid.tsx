import { Card, CardContent, CardHeader } from '../../components/ui/card'
import { Badge } from '../../components/ui/badge'
import { Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Course {
  id: string
  title: string
  description: string
  image: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  lessons: number
  duration: string
}

const courses: Course[] = [
  {
    id: '1',
    title: 'Intro to Cryptocurrency',
    description: 'An introduction to the world of cryptocurrency, covering topics like how crypto works, investing strategies, and mistakes to avoid.',
    image: 'https://learn.swyftx.com/wp-content/uploads/2022/07/Introduction-to-cryptocurrency-500x333.png',
    level: 'Beginner',
    lessons: 5,
    duration: '46 minutes'
  },
  {
    id: '2',
    title: 'Intro to Bitcoin',
    description: 'An introduction to Bitcoin, which covers what Bitcoin is and how it works, as well as exploring topics such as Bitcoin mining and Bitcoin halving.',
    image: 'https://learn.swyftx.com/wp-content/uploads/2022/07/Intro-to-bitcoin-500x333.png',
    level: 'Beginner',
    lessons: 2,
    duration: '27 minutes'
  },
  {
    id: '3',
    title: 'Trading and Analysis',
    description: 'A look at trading and analysis, exploring topics like market cycles, trading strategies, technical analysis, and fundamental analysis.',
    image: 'https://learn.swyftx.com/wp-content/uploads/2023/05/Trading-and-analysis-500x333.png',
    level: 'Intermediate',
    lessons: 5,
    duration: '65 minutes'
  }
]

export default function CourseGrid() {
  return (
    <section className="py-8 sm:py-12 md:py-16">
      <div className="container px-4 mx-auto">
        <h2 className="text-[24px] sm:text-[32px] md:text-[40px] font-sans text-[#13151b] font-light text-center mb-8 sm:mb-12">
          Blockchain and Cryptocurrency Education
        </h2>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/learn/courses/${course.id}`}
              className="block group"
            >
              <Card className="h-full transition-transform duration-300 hover:shadow-lg hover:-translate-y-2">
                <CardHeader className="p-0">
                  <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                    <Image
                      src={course.image}
                      alt={course.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-3 sm:p-4">
                  <h3 className="text-base sm:text-lg font-semibold mb-2 text-gray-900 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-gray-600 mb-3 text-sm line-clamp-3">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <Badge
                      variant={
                        course.level === 'Beginner'
                          ? 'beginner'
                          : course.level === 'Intermediate'
                          ? 'intermediate'
                          : 'advanced'
                      }
                      className="px-3 py-1 text-xs font-medium"
                    >
                      {course.level}
                    </Badge>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <span>{course.lessons} Lessons</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
    )
}

