import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import ReactMarkdown from 'react-markdown'

interface ResultProps {
  score: number;
  totalQuestions: number;
  analysis: string | null;
  onReset: () => void;
}

export default function Result({ score, totalQuestions, analysis, onReset }: ResultProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const isSuccess = percentage >= 70; // Define pass/fail criteria if needed

  return (
    <div className="text-center bg-gradient-to-b from-white to-purple-50 rounded-xl shadow-lg p-8">
      {/* 🎉 Title */}
      <motion.h2
        className="text-3xl font-extrabold text-purple-600 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        🎉 Goomi Quiz Results 🎉
      </motion.h2>

      {/* 📊 Score Display */}
      <motion.div
        className={`text-2xl font-bold ${
          isSuccess ? 'text-green-600' : 'text-red-600'
        } mb-6`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        You scored <span className="text-purple-700">{score}</span> out of {totalQuestions} 🎯
        <br />
        <span className="text-lg font-medium">
          ({percentage}% {isSuccess ? '✅ Well done!' : '❌ Keep practicing!'})
        </span>
      </motion.div>

      {/* 🧠 Goomi AI Analysis Section */}
      {analysis ? (
        <motion.div
          className="text-left mb-8 space-y-6 bg-purple-50 p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-purple-700 mb-4">🔍 Goomi AI's Talent Insights</h3>

          {/* Styled AI Analysis */}
          <ReactMarkdown
            className="prose prose-purple max-w-none"
            components={{
              h2: ({ node, ...props }) => (
                <h2
                  {...props}
                  className="text-2xl font-extrabold text-purple-700 border-b-2 border-purple-400 pb-1 mt-6 mb-3"
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  {...props}
                  className="text-xl font-bold text-purple-600 mt-5 mb-3"
                />
              ),
              p: ({ node, ...props }) => (
                <p {...props} className="bg-white p-3 rounded-lg shadow-md text-gray-800 text-lg font-medium mb-4" />
              ),
              strong: ({ node, ...props }) => (
                <strong {...props} className="text-purple-700 font-bold" />
              ),
              ul: ({ node, ...props }) => (
                <ul {...props} className="list-disc list-inside text-gray-700 ml-4 space-y-2" />
              ),
              li: ({ node, ...props }) => (
                <li {...props} className="bg-white p-2 rounded-md shadow text-gray-800 text-md" />
              ),
            }}
          >
            {analysis}
          </ReactMarkdown>
        </motion.div>
      ) : (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-xl font-medium text-gray-800 mb-4">
            Oops! AI couldn't generate an analysis.
          </p>
          <p className="text-gray-600">
            Please try again or check your inputs and internet connection.
          </p>
        </motion.div>
      )}

      
      {/* 🔄 Reset Quiz Button */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
        <Button
          onClick={onReset}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-lg"
        >
          🔄 Take the Quiz Again
        </Button>
      </motion.div>
    </div>
  );
}
