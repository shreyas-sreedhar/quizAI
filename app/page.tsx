'use client'

import { useState, lazy, Suspense } from 'react'
import { Button } from '@/components/ui/button'
import Quiz from '@/components/Quiz'

const Result = lazy(() => import('@/components/Result'))

export default function QuizPage() {
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Handles the quiz completion by submitting answers to an AI analysis API
  const handleQuizCompletion = async (answers: string[]) => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/analyze-talents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to get AI analysis')
      }

      setAiAnalysis(data.analysis)
      setQuizCompleted(true)
    } catch (error) {
      console.error('Error submitting quiz:', error)
      alert(`Failed to get AI analysis: ${(error as Error).message}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Resets the quiz to allow retaking
  const handleReset = () => {
    setQuizCompleted(false)
    setAiAnalysis(null)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex flex-col items-center justify-center p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-purple-800 mb-2">Goomi Academy Quiz</h1>
        <p className="text-xl text-purple-600">Challenge your mind with logical reasoning and reading comprehension!</p>
      </header>

    <Quiz />
      {/* {quizCompleted ? (
        <Suspense fallback={<p className="text-purple-700">Loading AI Analysis...</p>}>
          <Result analysis={aiAnalysis} onReset={handleReset} />
        </Suspense>
      ) : (
        <Quiz onComplete={handleQuizCompletion} isLoading={isLoading} />
      )} */}

      <footer className="mt-8 text-center text-sm text-purple-600">
        <p>&copy; 2023 Goomi Academy. All rights reserved.</p>
      </footer>
    </main>
  )
}
