'use client'

import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import ReactMarkdown from 'react-markdown'

export default function QuizLandingPage() {
  const router = useRouter()

  const handleStartQuiz = () => {
    router.push('/quiz') // Redirects to the quiz page
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-4xl font-bold text-center text-purple-600 mb-6">Welcome to the Goomi Academy Quiz!</h1>
        
        <p className="text-lg text-gray-700 mb-4 text-center">
          **Discover Your Child’s Hidden Talents with AI Analysis!**  
          Goomi Quiz is designed to evaluate your child's **critical thinking, reasoning, and comprehension skills** through a series of thoughtfully crafted **Logical Reasoning** and **Reading Comprehension** questions. 
        </p>
        
        <p className="text-lg text-gray-700 mb-6 text-center">
          Our advanced **AI-powered analysis** provides **personalized insights** into your child's strengths and areas for growth, helping them unlock their full potential.
        </p>

        <p className="text-lg text-gray-700 mb-6 text-center">
          This quiz contains <span className="font-bold text-purple-600">100 questions</span> and takes approximately **1 hour and 30 minutes** to complete.
        </p>

        <div className="flex justify-center">
          <Button className="px-6 py-3 text-lg" onClick={handleStartQuiz}>
            Start Quiz
          </Button>
        </div>
      </div>
    </div>
  )
}
