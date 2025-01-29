'use client'

import { useState, lazy, Suspense } from 'react'
import { Button } from '@/components/ui/button'
import Quiz from '@/components/Quiz'

const Result = lazy(() => import('@/components/Result'))

export default function QuizPage() {

  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex flex-col items-center justify-center p-4">

     <Quiz />
     
      <footer className="mt-8 text-center text-sm text-purple-600">
        <p>&copy; 2025 Goomi Academy. All rights reserved.</p>
      </footer>
    </main>
  )
}
