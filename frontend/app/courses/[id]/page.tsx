'use client'
import Header from '@/app/components/Header';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Clock, BookOpen } from 'lucide-react';

const courses = [
  {
    id: "1",
    title: 'Introduction to Blockchain',
    description: 'Learn the basics of blockchain technology',
    level: 'Beginner',
    image: 'https://learn.swyftx.com/wp-content/uploads/2022/07/Introduction-to-cryptocurrency-500x333.png',
    lessons: [
      { id: 1, title: 'What is Blockchain?', duration: 10 },
      { id: 2, title: 'How Blockchain Works', duration: 12 },
      { id: 3, title: 'Use Cases of Blockchain', duration: 14 },
    ],
  },
  {
    id: "2",
    title: 'Cryptocurrency Fundamentals',
    description: 'Understand the core concepts of cryptocurrencies',
    level: 'Beginner',
    image: 'https://learn.swyftx.com/wp-content/uploads/2022/07/Intro-to-bitcoin-500x333.png',
    lessons: [
      { id: 1, title: 'What is Cryptocurrency?', duration: 8 },
      { id: 2, title: 'Bitcoin: The First Cryptocurrency', duration: 9 },
      { id: 3, title: 'Altcoins and Tokens', duration: 10 },
    ],
  },
  {
    id: "3",
    title: 'Trading and Analysis',
    description: 'A look at trading and analysis, exploring topics like market cycles, trading strategies, technical analysis, and fundamental analysis.',
    level: 'Beginner',
    image: 'https://learn.swyftx.com/wp-content/uploads/2023/05/Trading-and-analysis-500x333.png',
    lessons: [
      { id: 1, title: 'What is Cryptocurrency?', duration: 8 },
      { id: 2, title: 'Bitcoin: The First Cryptocurrency', duration: 9 },
      { id: 3, title: 'Altcoins and Tokens', duration: 10 },
    ],
  }
];

type Course = {
  id: string;
}

export default function Course() {
  const params = useParams();
  const course = courses.find((c) => c.id === params.id);

  if (!course) {
    notFound();
  }

  const totalDuration = course.lessons.reduce((sum, lesson) => sum + lesson.duration, 0);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section - Course Info */}
          <div>
            <Image
              src={course.image}
              alt={course.title}
              width={400}
              height={300}
              className="rounded-lg shadow-lg"
            />
            <h1 className="text-4xl font-bold mt-6">{course.title}</h1>
            <p className="text-gray-700 text-lg mt-4">{course.description}</p>
            <div className="flex items-center gap-4 mt-6 text-sm text-gray-600">
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                {course.level}
              </span>
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                <span>{course.lessons.length} Lessons</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{totalDuration} minutes</span>
              </div>
            </div>
          </div>
          {/* Right Section - Lesson List */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Lessons</h2>
            <ul className="space-y-4">
              {course.lessons.map((lesson) => (
                <li
                  key={lesson.id}
                  className="p-4 border rounded-lg shadow-sm bg-white flex justify-between items-center"
                >
                  <div>
                    <h3 className="text-lg font-medium">{lesson.title}</h3>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{lesson.duration} minutes</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
