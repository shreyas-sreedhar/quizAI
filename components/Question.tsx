import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

interface QuestionProps {
  question: {
    id: number
    text: string
    options: string[]
  }
  number: number
  onAnswer: (answer: string) => void
  selectedAnswer: string
}

export default function Question({ question, number, onAnswer, selectedAnswer }: QuestionProps) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        <span className="text-purple-600 mr-2">{number}.</span> {question.text}
      </h3>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        {question.options.map((option, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="w-full"
          >
            <Button
  variant={selectedAnswer === option ? "default" : "outline"}
  className="w-full justify-start text-left break-words p-4"
  onClick={() => onAnswer(option)}
  style={{
    wordWrap: "break-word",
    whiteSpace: "normal",
    minHeight: "60px", // Ensures all buttons have at least this height
    display: "flex", // Ensures proper alignment of text inside the button
    alignItems: "center", // Vertically aligns text
  }}
>
  {option}
</Button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
