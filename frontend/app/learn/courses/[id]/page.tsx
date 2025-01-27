"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Image from "next/image";
import Header from "../../components/Header";
import courses from "@/app/data/course";
import Profile from "../../../../public/alternative_placeholder.svg";
import { Clock } from "lucide-react";
import { User } from "@/app/types/type";
import { BASE_URL } from "@/app/utils/constants";

// Define TypeScript interfaces for the course and lessons
interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface Lesson {
  id: string;
  title: string;
  duration: number;
  content: string;
  objectives: string[];
  sections: { heading: string; text: string }[];
  keyTakeaways: string[];
  quiz: QuizQuestion[];
}

interface Course {
  id: string;
  title: string;
  description: string;
  level: string;
  image: string;
  rewarded: boolean;
  lessons: Lesson[];
}

export default function Course() {
  const params = useParams();
  const course: any = courses.find((c) => c.id === params.id);
  const [user, setUser] = useState<User>();
  console.log("User: " + user?._id)
  if (!course) {
    notFound();
  }

  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [isCourseStarted, setIsCourseStarted] = useState(false);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [userPoints, setUserPoints] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);

  const totalDuration = course.lessons.reduce(
    (sum: any, lesson: Lesson) => sum + lesson.duration,
    0
  );

  const handleBackToCourse = () => {
    setSelectedLesson(null);
    setQuizCompleted(false);
    setQuizAnswers({});
    setCurrentQuizIndex(0);
  };

  const fetchCurrentUser = async (token: string) => {
    try {
      const response = await fetch(`${BASE_URL}/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user details.");
      }

      const userData = await response.json();
       setUser(userData.user);
    } catch (err) {
      console.error("Error fetching current user:", err);
    }
  };

  const handleQuizAnswer = (questionIndex: number, answer: string) => {
    setQuizAnswers((prev) => ({ ...prev, [questionIndex]: answer }));
  };

  const handleSubmitQuiz = async () => {
    if (!selectedLesson) return;
    fetchCurrentUser(`${localStorage.getItem('auth_token')}`)
    const correctAnswers = selectedLesson.quiz.filter(
      (question, index) => quizAnswers[index] === question.correctAnswer
    );
  
    if (correctAnswers.length === selectedLesson.quiz.length) {
      const score = correctAnswers.length;
  
      try {
        const response = await fetch(`${BASE_URL}/api/quiz/complete`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: user?._id, // Replace with the actual user ID
            course_id: course.id,
            lesson_id: selectedLesson.id,
            score: score,
            total_questions: selectedLesson.quiz.length,
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          setUserPoints((prev) => prev + data.pointsEarned);
          setQuizCompleted(true);
          alert('Quiz completed successfully! Points awarded.');
        } else {
          const error = await response.json();
          alert(`Error: ${error.message}`);
        }
      } catch (error) {
        console.error('Error submitting quiz:', error);
        alert('Something went wrong while submitting the quiz.');
      }
    } else {
      alert('Please answer all questions correctly to proceed!');
    }
  };
  

  const handleNextLesson = () => {
    if (!selectedLesson) return;

    const nextLessonIndex = course.lessons.findIndex(
      (lesson: Lesson) => lesson.id === selectedLesson.id
    ) + 1;

    if (nextLessonIndex < course.lessons.length) {
      setSelectedLesson(course.lessons[nextLessonIndex]);
      setQuizCompleted(false);
      setQuizAnswers({});
      setCurrentQuizIndex(0);
    } else {
      alert("You have completed all lessons!");
      setSelectedLesson(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {!selectedLesson ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              {/* Course Intro Section */}
              <div className="order-2 lg:order-1 space-y-6">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                  {course.title}
                </h1>
                <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                  {course.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                    {course.level}
                  </span>
                  <div className="flex items-center gap-1">
                    <span>{course.lessons.length} lessons</span>
                    <span>
                      <Clock className="w-4 h-4 ml-2" />
                    </span>
                    <span>{totalDuration} minutes</span>
                  </div>
                </div>
                <div className="mt-4">
                  <p
                    className={`${
                      course.rewarded ? "text-green-600" : "text-gray-500"
                    } font-medium`}
                  >
                    {course.rewarded
                      ? "This course is rewarded!"
                      : "This course is NOT rewarded."}
                  </p>
                </div>
                <button
                  onClick={() => setIsCourseStarted(true)}
                  className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Start Course
                </button>
              </div>

              {/* Course Image Section */}
              <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
                <div className="relative w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg">
                  <Image
                    src={course.image || Profile}
                    alt={course.title}
                    fill
                    quality={100}
                    priority
                    style={{ objectFit: "cover" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="transition-transform duration-300 ease-in-out hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Lessons Section */}
            <div className="mt-12 space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Course Lessons
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {course.lessons.map((lesson: Lesson, index: any) => (
                  <div
                    key={lesson.id}
                    onClick={() => setSelectedLesson(lesson)}
                    className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm hover:bg-gray-50 cursor-pointer transition duration-300 ease-in-out"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                          {index + 1}
                        </div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {lesson.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Duration: {lesson.duration} minutes
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Selected Lesson Content */
          <div className="space-y-6">
            <button
              onClick={handleBackToCourse}
              className="text-blue-600 hover:underline"
            >
              &larr; Back to Course
            </button>
            <h1 className="text-3xl font-bold text-gray-900">
              {selectedLesson.title}
            </h1>
            <p className="text-gray-700">{selectedLesson.content}</p>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Objectives
              </h2>
              <ul className="list-disc pl-5 text-gray-700">
                {selectedLesson.objectives.map((objective, index) => (
                  <li key={index}>{objective}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">Sections</h2>
              {selectedLesson.sections.map((section, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {section.heading}
                  </h3>
                  <p className="text-gray-700">{section.text}</p>
                </div>
              ))}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                Key Takeaways
              </h2>
              <ul className="list-disc pl-5 text-gray-700">
                {selectedLesson.keyTakeaways.map((takeaway, index) => (
                  <li key={index}>{takeaway}</li>
                ))}
              </ul>
            </div>
            <div className="mt-8">
              {!quizCompleted ? (
                <>
                  <h2 className="text-xl font-bold text-gray-900">Quiz</h2>
                  {selectedLesson.quiz.map((question, index) => (
                    <div key={index} className="mb-6">
                      <p className="text-gray-800">{question.question}</p>
                      <div className="mt-2">
                        {question.options.map((option, optionIndex) => (
                          <label
                            key={optionIndex}
                            className="block text-gray-700 cursor-pointer"
                          >
                            <input
                              type="radio"
                              name={`question-${index}`}
                              value={option}
                              onChange={() => handleQuizAnswer(index, option)}
                              checked={quizAnswers[index] === option}
                              className="mr-2"
                            />
                            {option}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button
                    onClick={handleSubmitQuiz}
                    className="px-6 py-3 bg-blue-600 text-white rounded-md"
                  >
                    Submit Quiz
                  </button>
                </>
              ) : (
                <button
                  onClick={handleNextLesson}
                  className="px-6 py-3 bg-green-600 text-white rounded-md"
                >
                  Next Lesson
                </button>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
