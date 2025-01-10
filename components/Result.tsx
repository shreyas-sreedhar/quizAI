import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

interface ResultProps {
  analysis: string | null
  onReset: () => void
}

export default function Result({ analysis, onReset }: ResultProps) {
  return (
    <div className="text-center">
      <motion.h2 
        className="text-2xl font-bold mb-4 text-purple-600"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Goomi's Talent Analysis
      </motion.h2>
      {analysis ? (
        <motion.div
          className="text-left mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          {analysis.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4">
              {paragraph}
            </p>
          ))}
        </motion.div>
      ) : (
        <motion.p
          className="text-xl mb-4 text-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          Oops! It looks like we couldn't generate an analysis. Please try again.
        </motion.p>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Button
          onClick={onReset}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-full transition-colors duration-200"
        >
          Take the quiz again
        </Button>
      </motion.div>
    </div>
  )
}

