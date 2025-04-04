import OpenAI from 'openai'
import { NextResponse } from 'next/server'

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Replace with your actual API key
})

// Define skill categories
export interface SkillScore {
  name: string;
  score: number;
  maxScore: number;
  description: string[];
  isGrowthArea: boolean;
  topStudentPercentage: number;
}

export async function POST(req: Request) {
  try {
    // Parse JSON body
    const { answers } = await req.json()

    if (!Array.isArray(answers)) {
      throw new Error('Invalid input: "answers" should be an array of strings.')
    }

    // Construct the prompt for text analysis
    const textAnalysisPrompt = `
      Based on the following quiz answers, provide a detailed and comprehensive analysis of the child's talents and strengths:

      ${answers.map((answer: string, index: number) => `Question ${index + 1}: ${answer}`).join('\n')}

      Instructions for the analysis:
      1. **Summary of the child's top 3 talent areas**: Write a detailed paragraph of at least 5-7 sentences explaining why these areas stand out, supported by examples or reasoning derived from the answers.
      2. **In-depth analysis of each talent area**: For each talent area, write a full paragraph (8-10 sentences) discussing what the talent implies, how it reflects in the answers, and the potential benefits of developing it. Use descriptive language and provide examples or hypothetical scenarios to make the analysis more relatable.
      3. **Suggestions for further development**: Provide at least 2 paragraphs with actionable advice, including specific activities, books, tools, or programs to nurture these talents. Explain how these suggestions align with the identified talents and why they are beneficial.
      4. **Additional insights or patterns**: Conclude with a paragraph (at least 6-8 sentences) identifying any notable patterns, unique traits, or areas of potential growth. End with an encouraging and positive tone to inspire the child's development.

      Make sure each paragraph is well-developed, cohesive, and elaborates on the points mentioned. The goal is to provide parents or educators with a thorough understanding of the child's abilities and actionable recommendations for growth.
    `

    // Construct the prompt for skills scoring
    const skillScoringPrompt = `
      Based on the following quiz answers, score the student's skills in these 7 categories: Communication, Creativity, Problem Solving, Curiosity, Organization, Growth Mindset, and Focus.

      ${answers.map((answer: string, index: number) => `Question ${index + 1}: ${answer}`).join('\n')}

      For each skill, provide:
      1. A numerical score (using a scale appropriate for each skill)
      2. Whether this is a strength or an area for growth
      3. The percentage of top students who typically have this skill

      Return your response as a JSON object with this exact structure:
      {
        "skills": [
          {
            "name": "Communication",
            "score": 7,
            "maxScore": 15,
            "isGrowthArea": true/false,
            "topStudentPercentage": 74 
          },
          // Repeat for other skills
        ]
      }
    `

    // Set up AbortController for timeout
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 30000) // 30 seconds timeout

    try {
      // First call: Get the detailed text analysis
      const textAnalysisResponse = await openai.chat.completions.create(
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                'You are an AI assistant specializing in child development and talent analysis. Provide long, detailed, and insightful advice based on the quiz results.',
            },
            { role: 'user', content: textAnalysisPrompt },
          ],
        },
        { signal: controller.signal } // Pass the abort signal
      )

      // Second call: Get the skill scores
      const skillScoringResponse = await openai.chat.completions.create(
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                'You are an AI assistant specializing in student assessment. Return a valid JSON object with the skill scores as requested.',
            },
            { role: 'user', content: skillScoringPrompt },
          ],
        },
        { signal: controller.signal } // Pass the abort signal
      )

      clearTimeout(timeout) // Clear timeout if request completes successfully

      const textAnalysis = textAnalysisResponse.choices[0]?.message?.content || ""
      let skillScores: SkillScore[] = []

      try {
        // Add descriptions for each skill category
        const skillDescriptions: Record<string, string[]> = {
          'Communication': [
            'Making new friends',
            'Working well in group projects',
            'Asking good questions in class'
          ],
          'Creativity': [
            'Art and creative writing projects',
            'Finding fun solutions to boring problems',
            'Making school projects more exciting'
          ],
          'Problem Solving': [
            'Math and science challenges',
            'Figuring out tricky homework questions',
            'Helping friends with difficult tasks'
          ],
          'Curiosity': [
            'Science experiments and discoveries',
            'Learning new subjects quickly',
            'Finding interesting facts and details'
          ],
          'Organization': [
            'Finishing homework on time',
            'Finding things when you need them',
            'Managing your time well'
          ],
          'Growth Mindset': [
            'Getting better at difficult subjects',
            'Not giving up when school gets hard',
            'Learning from mistakes'
          ],
          'Focus': [
            'Completing homework without getting distracted',
            'Studying for tests effectively',
            'Getting good grades through consistent effort'
          ]
        }

        // Parse skill scores from the second response
        const parsedSkills = JSON.parse(skillScoringResponse.choices[0]?.message?.content || "{}")
        
        if (parsedSkills.skills && Array.isArray(parsedSkills.skills)) {
          skillScores = parsedSkills.skills.map((skill: any) => ({
            ...skill,
            description: skillDescriptions[skill.name] || []
          }))
        }
      } catch (error) {
        console.error('Error parsing skill scores:', error)
        // If parsing fails, use default scores as fallback
        skillScores = [
          {
            name: 'Communication',
            score: 7,
            maxScore: 15,
            description: ['Making new friends', 'Working well in group projects', 'Asking good questions in class'],
            isGrowthArea: true,
            topStudentPercentage: 74
          },
          // Add more default skills...
        ]
      }

      // Return both the analysis and skill scores
      return NextResponse.json({ 
        analysis: textAnalysis,
        skills: skillScores,
        score: Math.round((answers.length / 2)) // Simple placeholder score calculation
      })
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.error('Request timed out:', error)
        return NextResponse.json(
          { error: 'Request timed out. Please try again.' },
          { status: 504 }
        )
      }
      throw error // Rethrow other errors
    }
  } catch (error: any) {
    console.error('Error generating analysis:', error)
    return NextResponse.json(
      { error: 'Failed to generate analysis.', details: error.message },
      { status: 500 }
    )
  }
}
