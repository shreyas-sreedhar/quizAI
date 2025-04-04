import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import ReactMarkdown from 'react-markdown'
import { useState, useEffect } from 'react'
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'

// Register ChartJS components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

interface ResultProps {
  score: number;
  totalQuestions: number;
  analysis: string | null;
  onReset: () => void;
  skills?: SkillScore[];
  goomiScore?: number;
}

interface SkillScore {
  name: string;
  score: number;
  maxScore: number;
  description: string[];
  isGrowthArea: boolean;
  topStudentPercentage: number;
}

export default function Result({ score, totalQuestions, analysis, onReset, skills: propSkills, goomiScore: propGoomiScore }: ResultProps) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const isSuccess = percentage >= 70; // Define pass/fail criteria if needed
  
  // Sample skills data - use props if provided, otherwise use default data
  const [activeTab, setActiveTab] = useState<'chart' | 'superpowers' | 'breakdown'>('chart')
  const [skills, setSkills] = useState<SkillScore[]>([
    {
      name: 'Communication',
      score: 7,
      maxScore: 15,
      description: [
        'Making new friends',
        'Working well in group projects',
        'Asking good questions in class'
      ],
      isGrowthArea: true,
      topStudentPercentage: 74
    },
    {
      name: 'Creativity',
      score: 1,
      maxScore: 20,
      description: [
        'Art and creative writing projects',
        'Finding fun solutions to boring problems',
        'Making school projects more exciting'
      ],
      isGrowthArea: true,
      topStudentPercentage: 82
    },
    {
      name: 'Problem Solving',
      score: 4,
      maxScore: 15,
      description: [
        'Math and science challenges',
        'Figuring out tricky homework questions',
        'Helping friends with difficult tasks'
      ],
      isGrowthArea: true,
      topStudentPercentage: 65
    },
    {
      name: 'Curiosity',
      score: 8,
      maxScore: 15,
      description: [
        'Science experiments and discoveries',
        'Learning new subjects quickly',
        'Finding interesting facts and details'
      ],
      isGrowthArea: false,
      topStudentPercentage: 71
    },
    {
      name: 'Organization',
      score: 6,
      maxScore: 20,
      description: [
        'Finishing homework on time',
        'Finding things when you need them',
        'Managing your time well'
      ],
      isGrowthArea: true,
      topStudentPercentage: 47
    },
    {
      name: 'Growth Mindset',
      score: 4,
      maxScore: 15,
      description: [
        'Getting better at difficult subjects',
        'Not giving up when school gets hard',
        'Learning from mistakes'
      ],
      isGrowthArea: true,
      topStudentPercentage: 55
    },
    {
      name: 'Focus',
      score: 3,
      maxScore: 15,
      description: [
        'Completing homework without getting distracted',
        'Studying for tests effectively',
        'Getting good grades through consistent effort'
      ],
      isGrowthArea: true,
      topStudentPercentage: 32
    }
  ])

  // Use provided goomiScore or calculate one
  const goomiScore = propGoomiScore || Math.round(percentage * 0.66);

  // Update skills state if props are provided
  useEffect(() => {
    if (propSkills && propSkills.length > 0) {
      setSkills(propSkills);
    }
  }, [propSkills]);

  // Generate chart data from skills
  const chartData = {
    labels: skills.map(skill => skill.name),
    datasets: [
      {
        label: 'Your Skills',
        data: skills.map(skill => (skill.score / skill.maxScore) * 100),
        backgroundColor: 'rgba(59, 130, 246, 0.4)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
      },
      {
        label: 'Top Students',
        data: skills.map(skill => Math.min(85, skill.topStudentPercentage + 15)),
        backgroundColor: 'rgba(16, 185, 129, 0.4)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2,
      },
      {
        label: 'Class Average',
        data: skills.map(skill => Math.min(70, skill.topStudentPercentage - 10)),
        backgroundColor: 'rgba(245, 158, 11, 0.4)',
        borderColor: 'rgba(245, 158, 11, 1)',
        borderWidth: 2,
      }
    ]
  };

  const chartOptions = {
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 25,
          backdropColor: 'transparent'
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        angleLines: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        pointLabels: {
          font: {
            size: 14,
            weight: 'bold' as const
          }
        }
      }
    },
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#334155',
        bodyColor: '#334155',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 8,
        boxPadding: 6
      }
    }
  };

  // Define skill name to emoji map
  const skillEmojis: Record<string, string> = {
    'Communication': '💬',
    'Creativity': '🎨',
    'Problem Solving': '🧩',
    'Curiosity': '🔍',
    'Organization': '📋',
    'Growth Mindset': '🌱',
    'Focus': '🎯'
  };

  // Define color theme for each skill
  const skillThemes: Record<string, {bg: string, text: string, border: string, light: string}> = {
    'Communication': {
      bg: 'bg-purple-100', 
      text: 'text-purple-700',
      border: 'border-purple-300',
      light: 'bg-purple-50'
    },
    'Creativity': {
      bg: 'bg-yellow-100', 
      text: 'text-yellow-700',
      border: 'border-yellow-300',
      light: 'bg-yellow-50'
    },
    'Problem Solving': {
      bg: 'bg-orange-100', 
      text: 'text-orange-700',
      border: 'border-orange-300',
      light: 'bg-orange-50'
    },
    'Curiosity': {
      bg: 'bg-blue-100', 
      text: 'text-blue-700',
      border: 'border-blue-300',
      light: 'bg-blue-50'
    },
    'Organization': {
      bg: 'bg-indigo-100', 
      text: 'text-indigo-700',
      border: 'border-indigo-300',
      light: 'bg-indigo-50'
    },
    'Growth Mindset': {
      bg: 'bg-green-100', 
      text: 'text-green-700',
      border: 'border-green-300',
      light: 'bg-green-50'
    },
    'Focus': {
      bg: 'bg-pink-100', 
      text: 'text-pink-700',
      border: 'border-pink-300',
      light: 'bg-pink-50'
    }
  };

  // Define animation variants for smooth transitions
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <div className="text-center rounded-xl">
      {/* Overall Score Banner */}
      <motion.div
        className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl mb-6 p-6 text-white shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center">
            <div className="bg-white/20 p-4 rounded-full mr-4">
              <span className="text-4xl">🏆</span>
            </div>
            <div className="text-left">
              <h2 className="text-xl font-semibold text-blue-100">Overall Score</h2>
              <div className="text-5xl font-bold text-white">{goomiScore}</div>
            </div>
          </div>
          <div className="bg-white/10 px-5 py-3 rounded-lg backdrop-blur-sm">
            <span className="font-medium">Great job! Keep it up! 👏</span>
          </div>
        </div>
      </motion.div>
      
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center mb-6 gap-2 border-b">
        <button 
          className={`flex items-center py-3 px-5 rounded-t-lg transition-all duration-200 ${
            activeTab === 'chart' 
              ? 'bg-gradient-to-b from-white to-blue-50 border-b-2 border-blue-500 text-blue-600 shadow-sm' 
              : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50/50'
          }`}
          onClick={() => setActiveTab('chart')}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Skills Chart
        </button>
        <button 
          className={`flex items-center py-3 px-5 rounded-t-lg transition-all duration-200 ${
            activeTab === 'superpowers' 
              ? 'bg-gradient-to-b from-white to-blue-50 border-b-2 border-blue-500 text-blue-600 shadow-sm' 
              : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50/50'
          }`}
          onClick={() => setActiveTab('superpowers')}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Superpowers
        </button>
        <button 
          className={`flex items-center py-3 px-5 rounded-t-lg transition-all duration-200 ${
            activeTab === 'breakdown' 
              ? 'bg-gradient-to-b from-white to-blue-50 border-b-2 border-blue-500 text-blue-600 shadow-sm' 
              : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50/50'
          }`}
          onClick={() => setActiveTab('breakdown')}
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
          </svg>
          Skill Breakdown
        </button>
      </div>

      {/* Tab Content */}
      <div className="mb-8">
        {activeTab === 'chart' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-left"
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-blue-700 flex items-center">
                <span className="text-amber-500 mr-2">🏆</span> Your Skills Map
              </h2>
              <p className="text-gray-600">This radar chart shows your skill strengths and areas for growth compared to others.</p>
            </div>
            
            <div className="mt-4 mb-6 flex flex-wrap items-center gap-2">
              <div className="bg-blue-50 px-4 py-2 rounded-full">
                <span className="text-gray-700 font-medium">Goomi score • <span className="text-blue-600 font-bold">{goomiScore}</span></span>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center mb-4 gap-4">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-gray-700">Your Skills</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-500 rounded-full mr-2"></div>
                <span className="text-gray-700">Top Students</span>
              </div>
              
              <div className="flex items-center">
                <div className="w-4 h-4 bg-amber-500 rounded-full mr-2"></div>
                <span className="text-gray-700">Class Average</span>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 h-[500px]">
              <Radar data={chartData} options={chartOptions} />
            </div>
            
            <div className="mt-8 bg-gradient-to-r from-amber-50 to-amber-100 p-5 rounded-lg border-l-4 border-amber-400 shadow-sm">
              <div className="flex items-center">
                <span className="text-amber-500 text-2xl mr-3">🏅</span>
                <p className="text-gray-800 font-medium">Your strongest skills are the areas that stretch furthest on the chart!</p>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'superpowers' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            variants={containerVariants}
          >
            <div className="text-left mb-6">
              <h2 className="text-2xl font-bold text-blue-700 flex items-center">
                <span className="text-amber-500 mr-2">⚡</span> Your Superpowers
              </h2>
              <p className="text-gray-600">Here are the exceptional strengths that make you unique!</p>
            </div>
            
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
              {skills
                .sort((a, b) => (b.score / b.maxScore) - (a.score / a.maxScore))
                .slice(0, 3)
                .map((skill, index) => {
                  const theme = skillThemes[skill.name] || {
                    bg: 'bg-blue-100', 
                    text: 'text-blue-700',
                    border: 'border-blue-300',
                    light: 'bg-blue-50'
                  };
                  
                  return (
                    <motion.div 
                      key={index} 
                      variants={itemVariants}
                      className={`${theme.light} p-6 rounded-xl shadow-md border ${theme.border}`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`${theme.bg} p-3 rounded-full text-3xl`}>
                          {skillEmojis[skill.name] || '✨'}
                        </div>
                        <div className="flex-1">
                          <h3 className={`text-xl font-bold ${theme.text} mb-2`}>{skill.name}</h3>
                          
                          <div className="flex items-center mb-4 gap-3">
                            <div className="flex items-baseline">
                              <span className="text-2xl font-bold text-gray-800">{skill.score}</span>
                              <span className="text-gray-500 text-sm ml-1">/ {skill.maxScore}</span>
                            </div>
                            
                            <div className="flex-1 bg-gray-200 rounded-full h-2.5 max-w-xs">
                              <div 
                                className={`h-2.5 rounded-full ${
                                  (skill.score / skill.maxScore) < 0.4 ? 'bg-red-500' : 
                                  (skill.score / skill.maxScore) < 0.7 ? 'bg-yellow-500' : 
                                  'bg-green-500'
                                }`} 
                                style={{ width: `${(skill.score / skill.maxScore) * 100}%` }}
                              ></div>
                            </div>
                            
                            <div className="bg-amber-100 px-3 py-1 rounded-full text-sm text-amber-800 flex items-center">
                              <span className="mr-1">🏆</span>
                              <span>Top {Math.round((skill.score / skill.maxScore) * 100)}%</span>
                            </div>
                          </div>
                          
                          <h4 className={`${theme.text} font-medium mb-2`}>This superpower helps you:</h4>
                          <ul className="space-y-2">
                            {skill.description.map((desc, i) => (
                              <li key={i} className="flex items-start">
                                <span className="inline-block mr-2 mt-1 text-green-500">✓</span>
                                <span className="text-gray-700">{desc}</span>
                              </li>
                            ))}
                          </ul>
                          
                          <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="text-sm text-gray-500">
                              <span className="font-medium">{skill.topStudentPercentage}%</span> of top students have this skill
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </motion.div>
            
            <div className="mt-8 bg-blue-50 p-5 rounded-lg shadow-sm border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="text-blue-500 text-xl mt-1">💡</div>
                <div className="flex-1">
                  <h3 className="font-medium text-blue-700 mb-1">Keep developing your strengths!</h3>
                  <p className="text-gray-600 text-sm">These superpowers are what make you special. Continue to practice and develop them further!</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'breakdown' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-green-100 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Your Skills Report Card</h2>
            </div>
            <p className="text-left text-gray-600 mb-8">Here's how you did in each skill area compared to other students</p>
            
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {skills.map((skill, index) => {
                const theme = skillThemes[skill.name] || {
                  bg: 'bg-blue-100', 
                  text: 'text-blue-700',
                  border: 'border-blue-300',
                  light: 'bg-blue-50'
                };
                
                return (
                  <motion.div 
                    key={index} 
                    variants={itemVariants}
                    className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
                  >
                    <div className={`${theme.bg} px-4 py-3`}>
                      <div className="flex items-center">
                        <div className="mr-3 text-2xl">{skillEmojis[skill.name] || '✨'}</div>
                        <h3 className={`text-lg font-bold ${theme.text}`}>{skill.name}</h3>
                      </div>
                    </div>
                    
                    <div className="p-5">
                      <div className="flex justify-between items-baseline mb-2">
                        <div className="flex items-baseline">
                          <span className="text-4xl font-bold text-gray-800">{skill.score}</span>
                          <span className="text-gray-500 text-sm ml-2">of {skill.maxScore} points</span>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${skill.isGrowthArea ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                          {skill.isGrowthArea ? 'Growth Area' : 'Developing Skill'}
                        </div>
                      </div>
                      
                      <div className="relative w-full h-3 bg-gray-200 rounded-full mb-4 overflow-hidden">
                        <div 
                          className={`absolute top-0 left-0 h-full rounded-full ${
                            (skill.score / skill.maxScore) < 0.4 ? 'bg-red-500' : 
                            (skill.score / skill.maxScore) < 0.7 ? 'bg-yellow-500' : 
                            'bg-green-500'
                          }`} 
                          style={{ width: `${(skill.score / skill.maxScore) * 100}%` }}
                        >
                          <div className="absolute inset-0 bg-white/30 animate-pulse rounded-full"></div>
                        </div>
                      </div>
                      
                      <div className="bg-amber-50 px-4 py-2 rounded-lg mb-4 flex items-center">
                        <span className="text-amber-500 mr-2">🏆</span>
                        <span className="text-gray-700 text-sm">{skill.topStudentPercentage}% of top students have this skill</span>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-700 mb-2">This skill helps you:</h4>
                        <ul className="space-y-2 pl-1">
                          {skill.description.map((desc, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-blue-500 mr-2">•</span>
                              <span className="text-gray-600">{desc}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* AI Analysis Section (collapsed) */}
      {analysis && (
        <motion.details
          className="text-left mb-8 bg-gradient-to-br from-purple-50 to-indigo-50 p-5 rounded-xl shadow-md border border-purple-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <summary className="text-xl font-bold text-purple-700 cursor-pointer flex items-center">
            <div className="bg-purple-200 p-2 rounded-full mr-3">
              <span className="text-purple-700">🔍</span>
            </div>
            Goomi AI's Detailed Analysis
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </summary>
          <div className="mt-4 pl-10">
            <ReactMarkdown
              className="prose prose-purple max-w-none"
              components={{
                h2: ({ node, ...props }) => (
                  <h2 {...props} className="text-xl font-bold text-purple-700 border-b border-purple-200 pb-2 mt-6 mb-3" />
                ),
                h3: ({ node, ...props }) => (
                  <h3 {...props} className="text-lg font-bold text-purple-600 mt-4 mb-2" />
                ),
                p: ({ node, ...props }) => (
                  <p {...props} className="bg-white p-4 rounded-lg shadow-sm text-gray-700 text-base mb-4" />
                ),
                strong: ({ node, ...props }) => (
                  <strong {...props} className="text-purple-700 font-bold" />
                ),
                ul: ({ node, ...props }) => (
                  <ul {...props} className="list-disc list-inside text-gray-700 ml-4 space-y-2 mb-4" />
                ),
                li: ({ node, ...props }) => (
                  <li {...props} className="text-gray-700 text-base bg-white/70 p-2 rounded" />
                ),
              }}
            >
              {analysis}
            </ReactMarkdown>
          </div>
        </motion.details>
      )}
      
      {/* Reset Quiz Button */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
        className="mt-8"
      >
        <Button
          onClick={onReset}
          className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105"
        >
          🔄 Take the Quiz Again
        </Button>
      </motion.div>
    </div>
  );
}
