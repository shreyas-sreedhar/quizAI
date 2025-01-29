'use client'

import { useState, lazy, Suspense } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProgressBar from '@/components/ProgressBar'

const Question = lazy(() => import('@/components/Question'))
const Result = lazy(() => import('@/components/Result'))

const quizSections = [
  {
    id: 1,
    title: "Learning Preferences",
    questions: [
      { id: 1, text: "How does your child prefer to learn new things?", options: ["By watching videos", "Through hands-on experiments", "By listening to explanations", "By reading about it", "By teaching others"] },
      { id: 2, text: "What type of school projects does your child enjoy most?", options: ["Art and crafts", "Science experiments", "Writing stories", "Group presentations", "Building models"] },
      { id: 3, text: "In which subject does your child excel the most?", options: ["Art", "Math", "Physical Education", "Language Arts", "Music"] },
      { id: 4, text: "How does your child prefer to study for tests?", options: ["Using flashcards", "Creating mind maps", "Practicing sample questions", "Discussing with study groups", "Teaching the material to others"] },
      { id: 5, text: "What kind of books does your child enjoy reading?", options: ["Picture books", "Science fiction", "Biographies", "Mystery novels", "Poetry"] }
    ]
  },
  {
    id: 2,
    title: "Leisure Activities",
    questions: [
      { id: 6, text: "What does your child enjoy doing most in their free time?", options: ["Drawing or painting", "Solving puzzles", "Playing sports", "Reading books", "Playing video games"] },
      { id: 7, text: "What type of games does your child prefer?", options: ["Creative building games", "Strategy and puzzle games", "Sports and action games", "Story-based adventure games", "Music and rhythm games"] },
      { id: 8, text: "What kind of outdoor activities does your child enjoy?", options: ["Nature walks and exploration", "Team sports", "Gardening", "Photography", "Outdoor performances"] },
      { id: 9, text: "What indoor hobbies does your child have?", options: ["Crafting or DIY projects", "Coding or computer activities", "Cooking or baking", "Writing stories or journaling", "Playing musical instruments"] },
      { id: 10, text: "How does your child like to spend time with friends?", options: ["Creating art together", "Playing board games", "Engaging in sports activities", "Book clubs or reading together", "Making music or singing"] }
    ]
  },
  {
    id: 3,
    title: "Social Interactions",
    questions: [
      { id: 11, text: "How does your child typically interact with others?", options: ["Leads group activities", "Prefers one-on-one conversations", "Enjoys team collaborations", "Likes to perform for others", "Prefers independent activities"] },
      { id: 12, text: "How does your child usually resolve conflicts with peers?", options: ["Through discussion and compromise", "By seeking adult help", "By finding creative solutions", "By asserting their point of view", "By avoiding confrontation"] },
      { id: 13, text: "In group projects, what role does your child often take?", options: ["The leader", "The idea generator", "The organizer", "The presenter", "The researcher"] },
      { id: 14, text: "How does your child respond to new social situations?", options: ["Eagerly jumps in", "Observes before participating", "Seeks out familiar faces", "Introduces themselves confidently", "Prefers to stay on the sidelines"] },
      { id: 15, text: "How does your child show empathy towards others?", options: ["Through artistic expressions", "By offering logical solutions", "Through physical comfort", "By using words of encouragement", "By composing or sharing music"] }
    ]
  },
  {
    id: 4,
    title: "Problem-Solving Approach",
    questions: [
      { id: 16, text: "How does your child usually approach problems?", options: ["By thinking outside the box", "By breaking it down logically", "By taking action and trying solutions", "By discussing it with others", "By looking for patterns"] },
      { id: 17, text: "What kind of puzzles or brain teasers does your child enjoy?", options: ["Visual puzzles", "Logic puzzles", "Physical puzzle toys", "Word puzzles", "Musical puzzles"] },
      { id: 18, text: "How does your child handle frustration when solving problems?", options: ["Takes a creative break", "Analyzes what went wrong", "Engages in physical activity", "Talks it out with someone", "Listens to music"] },
      { id: 19, text: "What's your child's preferred method for organizing information?", options: ["Creating visual diagrams", "Making lists and charts", "Using physical models or demonstrations", "Writing detailed notes", "Using rhythms or songs to remember"] },
      { id: 20, text: "How does your child approach learning a new skill?", options: ["By watching tutorials", "By reading instructions", "By trial and error", "By asking for demonstrations", "By finding patterns in the process"] }
    ]
  },
  {
    id: 5,
    title: "Creative Expression",
    questions: [
      { id: 21, text: "What's your child's preferred method of creative expression?", options: ["Visual arts (drawing, painting)", "Writing stories or poetry", "Dance or movement", "Drama or role-playing", "Musical composition"] },
      { id: 22, text: "How does your child respond to open-ended creative tasks?", options: ["Thrives on the freedom", "Prefers some guidelines", "Combines physical activity with creativity", "Collaborates with others", "Incorporates musical elements"] },
      { id: 23, text: "What kind of art projects does your child enjoy most?", options: ["Painting or drawing", "Sculpture or 3D art", "Photography", "Digital art or graphic design", "Mixed media or collage"] },
      { id: 24, text: "How does your child express emotions?", options: ["Through artwork", "By writing in a journal", "Through physical activities", "By talking with others", "Through music or song"] },
      { id: 25, text: "What inspires your child's creativity?", options: ["Nature and the outdoors", "Scientific concepts", "Sports and movement", "Books and stories", "Music and sounds"] }
    ]
  },
  {
    id: 6,
    title: "Physical Abilities",
    questions: [
      { id: 26, text: "What type of physical activities does your child excel in?", options: ["Fine motor skills (drawing, crafting)", "Team sports", "Individual sports", "Dance or gymnastics", "Martial arts"] },
      { id: 27, text: "How does your child prefer to stay active?", options: ["Through artistic activities", "By solving physical puzzles or challenges", "Through competitive sports", "By exploring nature", "Through rhythmic activities"] },
      { id: 28, text: "What's your child's attitude towards physical education class?", options: ["Enjoys artistic aspects", "Likes learning about body mechanics", "Thrives on the physical challenge", "Appreciates team-building aspects", "Enjoys activities with musical components"] },
      { id: 29, text: "How does your child approach learning a new physical skill?", options: ["Visualizes the movements", "Analyzes the technique", "Practices repeatedly", "Learns from watching others", "Moves to a rhythm or beat"] },
      { id: 30, text: "What kind of outdoor activities does your child enjoy?", options: ["Nature sketching or photography", "Geocaching or orienteering", "Sports or physical games", "Storytelling or role-playing outdoors", "Outdoor music or performances"] }
    ]
  },
  {
    id: 7,
    title: "Musical Inclination",
    questions: [
      { id: 31, text: "How does your child respond to music?", options: ["By creating visual art", "By analyzing the structure", "By moving or dancing", "By writing lyrics", "By playing along or singing"] },
      { id: 32, text: "What aspect of music interests your child most?", options: ["The visual aspects of performances", "The mathematical patterns in music", "The physical aspects of playing instruments", "The storytelling in lyrics", "The emotional expression in melodies"] },
      { id: 33, text: "How does your child engage with musical instruments?", options: ["Enjoys the visual design", "Interested in how they work", "Likes the physical challenge of playing", "Uses them to accompany stories", "Experiments with creating melodies"] },
      { id: 34, text: "What role does music play in your child's daily life?", options: ["Background for art creation", "Aids in concentration for problem-solving", "Motivates during physical activities", "Inspires storytelling or writing", "Constant presence, often humming or singing"] },
      { id: 35, text: "How does your child prefer to experience live music?", options: ["Appreciates the visual spectacle", "Analyzes the performance technique", "Engages through dance or movement", "Listens for the story in the songs", "Sings along or plays air instruments"] }
    ]
  },
  {
    id: 8,
    title: "Logical Reasoning",
    questions: [
      { id: 36, text: "What types of logical challenges does your child enjoy?", options: ["Visual puzzles", "Mathematical problems", "Strategic physical games", "Word problems or riddles", "Pattern recognition in music"] },
      { id: 37, text: "How does your child approach strategic games?", options: ["Focuses on the visual aspects", "Analyzes possible outcomes", "Uses intuition and quick reactions", "Enjoys the narrative elements", "Looks for rhythms or patterns in gameplay"] },
      { id: 38, text: "What aspect of science interests your child most?", options: ["The visual elements (e.g., space, nature)", "The logical and mathematical aspects", "Hands-on experiments", "The stories of scientific discovery", "The patterns and rhythms in nature"] },
      { id: 39, text: "How does your child organize their thoughts or ideas?", options: ["Through diagrams or mind maps", "With lists and categories", "By acting them out physically", "By writing them down narratively", "By associating them with melodies"] },
      { id: 40, text: "What approach does your child take when solving math problems?", options: ["Uses visual aids or drawings", "Follows logical steps", "Uses physical objects for counting", "Creates word problems", "Looks for numerical patterns"] }
    ]
  },
  {
    id: 9,
    title: "Technological Aptitude",
    questions: [
      { id: 41, text: "How does your child interact with technology?", options: ["Enjoys digital art or design", "Likes coding or problem-solving apps", "Prefers active or motion-based games", "Uses it for storytelling or writing", "Engages with music creation apps"] },
      { id: 42, text: "What type of educational apps does your child prefer?", options: ["Art and creativity apps", "Puzzle and strategy games", "Virtual sports or activity games", "Interactive storytelling apps", "Music learning apps"] },
      { id: 43, text: "How does your child approach learning new technology?", options: ["Explores visual interfaces intuitively", "Reads manuals or follows tutorials", "Learns through trial and error", "Asks others for guidance", "Looks for audio cues or musical elements"] },
      { id: 44, text: "What aspect of computer use interests your child most?", options: ["Graphic design or video editing", "Programming or web development", "Gaming or virtual reality", "Blogging or content creation", "Music production or audio editing"] },
      { id: 45, text: "How does your child use social media or online platforms?", options: ["Sharing artwork or designs", "Engaging in educational or quiz content", "Sharing physical achievements or activities", "Storytelling or creative writing", "Sharing musical interests or creations"] }
    ]
  },
  {
    id: 10,
    title: "Future Aspirations",
    questions: [
      { id: 46, text: "What kind of future career has your child expressed interest in?", options: ["Artist or designer", "Scientist or engineer", "Athlete or physical trainer", "Writer or journalist", "Musician or composer"] },
      { id: 47, text: "What skills does your child want to improve or learn?", options: ["Artistic techniques", "Logical and analytical skills", "Physical abilities or sports skills", "Writing and communication", "Musical instrument or vocal skills"] },
      { id: 48, text: "What kind of high school classes is your child most excited about?", options: ["Art or design classes", "Math or science courses", "Physical education or sports", "Literature or creative writing", "Music or performing arts"] },
      { id: 49, text: "What type of extracurricular activities interest your child?", options: ["Art club or photography", "Chess club or debate team", "Sports teams or fitness classes", "Creative writing or book club", "Band or choir"] },
      { id: 50, text: "What does your child envision as their greatest future achievement?", options: ["Creating a masterpiece", "Making a scientific discovery", "Winning a sports championship", "Publishing a book", "Performing at a major concert"] }
    ]
  }
]

export default function QuizPage() {
  const [currentPage, setCurrentPage] = useState(0)
  const [answers, setAnswers] = useState<string[]>(
    new Array(
      quizSections.reduce((acc, section) => acc + section.questions.length, 0)
    ).fill('')
  )
  const [showResult, setShowResult] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleAnswer = (questionIndex: number, answer: string) => {
    const newAnswers = [...answers]
    const globalQuestionIndex = currentPage * 5 + questionIndex
    newAnswers[globalQuestionIndex] = answer
    setAnswers(newAnswers)
  }

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1)
    } else {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/analyze-talents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers }),
      })
  
      // Parse response JSON
      const data = await response.json()
  
      // Check if the response is OK
      if (!response.ok) {
        // Use the `message` property if it exists, otherwise fallback to a generic error message
        throw new Error(data.error || 'Failed to get AI analysis')
      }
  
      setAiAnalysis(data.analysis)
      setShowResult(true)
    } catch (error) {
      if (error instanceof Error) {
        // Log and alert the error message
        console.error('Error submitting quiz:', error)
        alert(`Failed to get AI analysis: ${error.message}`)
      } else {
        // Handle unknown error types
        console.error('An unknown error occurred:', error)
        alert('An unknown error occurred. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }
  
  

  const resetQuiz = () => {
    setCurrentPage(0)
    setAnswers(
      new Array(
        quizSections.reduce((acc, section) => acc + section.questions.length, 0)
      ).fill('')
    )
    setShowResult(false)
    setAiAnalysis(null)
  }

  const totalQuestions = quizSections.reduce((acc, section) => acc + section.questions.length, 0)
  const totalPages = Math.ceil(totalQuestions / 5)
  const currentSection = quizSections[Math.floor(currentPage / 2)]
  const questionsOnPage = quizSections
    .flatMap((s) => s.questions)
    .slice(currentPage * 5, (currentPage + 1) * 5)
    .map((q, i) => ({ ...q, number: currentPage * 5 + i + 1 }))

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex items-center justify-center px-4 py-12">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-center text-purple-600 mb-8">
            Goomi Academy Talent Quiz
          </h1>
          <AnimatePresence mode="wait">
            {!showResult ? (
              <motion.div
                key="question"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ProgressBar current={currentPage + 1} total={totalPages} />
                <h2 className="text-2xl font-semibold mb-4 text-purple-600">
                  {currentSection.title}
                </h2>
                <Suspense fallback={<div>Loading questions...</div>}>
                  {questionsOnPage.map((question, index) => (
                    <Question
                      key={question.id}
                      question={question}
                      number={question.number}
                      onAnswer={(answer) => handleAnswer(index, answer)}
                      selectedAnswer={answers[currentPage * 5 + index]}
                    />
                  ))}
                </Suspense>
                <div className="flex justify-between mt-8">
                  <Button
                    onClick={handlePrevious}
                    disabled={currentPage === 0}
                    variant="outline"
                    className="flex items-center"
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                  </Button>
                  <Button
                    onClick={handleNext}
                    className="flex items-center"
                    disabled={isLoading}
                  >
                    {currentPage === totalPages - 1
                      ? isLoading
                        ? 'Analyzing...'
                        : 'Submit'
                      : 'Next'}
                    {!isLoading && (
                      <ChevronRight className="ml-2 h-4 w-4" />
                    )}
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Suspense fallback={<div>Loading result...</div>}>
                  <Result analysis={aiAnalysis} onReset={resetQuiz} />
                </Suspense>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <div className="bg-purple-100 p-4 flex justify-center">
          <img src="/Goomi.jpg" alt="Goomi the Penguin" className="w-24 h-24" />
        </div>
      </div>
    </div>
  )
}
