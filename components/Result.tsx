import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import ReactMarkdown from 'react-markdown'

interface ResultProps {
  analysis: string | null
  onReset: () => void
}

export default function Result({ analysis, onReset }: ResultProps) {
  return (
    <div className="text-center bg-gradient-to-b from-white to-purple-50 rounded-xl shadow-lg p-6">
      <motion.h2
        className="text-3xl font-extrabold text-purple-600 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        🎉 Goomi's Talent Analysis 🎉
      </motion.h2>
      {analysis ? (
        <motion.div
          className="text-left mb-8 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <ReactMarkdown
            className="prose prose-purple max-w-none"
            components={{
              p: ({ node, ...props }) => (
                <p {...props} className="bg-purple-50 p-4 rounded-lg shadow-md text-gray-800 text-lg font-semibold mb-4" />
              ),
              h2: ({ node, ...props }) => (
                <h2 {...props} className="text-xl font-bold text-purple-600 mb-2" />
              ),
              strong: ({ node, ...props }) => (
                <strong {...props} className="text-purple-700 font-bold" />
              ),
            }}
          >
            {analysis}
          </ReactMarkdown>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xl font-medium text-gray-800 mb-4">
            Oops! It seems we couldn't generate an analysis.
          </p>
          <p className="text-gray-600">
            Please try again or check your inputs and internet connection.
          </p>
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-6"
      >
        <Button
          onClick={onReset}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full transition-all shadow-lg"
        >
          🔄 Take the Quiz Again
        </Button>
      </motion.div>
    </div>
  )
}
