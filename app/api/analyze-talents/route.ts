import OpenAI from 'openai'
import { NextResponse } from 'next/server'

// Initialize OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Replace with your actual API key
})

export async function POST(req: Request) {
  try {
    // Parse JSON body
    const { answers } = await req.json()

    if (!Array.isArray(answers)) {
      throw new Error('Invalid input: "answers" should be an array of strings.')
    }

    // Construct the prompt
    const prompt = `
      Based on the following quiz answers, analyze the child's talents and provide insights:

      ${answers.map((answer: string, index: number) => `Question ${index + 1}: ${answer}`).join('\n')}

      Please provide:
      1. A summary of the child's top 3 talent areas
      2. Detailed analysis of each talent area
      3. Suggestions for activities or resources to further develop these talents
      4. Any additional insights or recommendations
    `

    // Set up AbortController for timeout
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 15000) // 15 seconds timeout

    try {
      // Call OpenAI API
      const response = await openai.chat.completions.create(
        {
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content:
                'You are an AI assistant specializing in child development and talent analysis. Provide insightful, encouraging, and actionable advice based on the quiz results.',
            },
            { role: 'user', content: prompt },
          ],
        },
        { signal: controller.signal } // Pass the abort signal
      )

      clearTimeout(timeout) // Clear timeout if request completes successfully

      const text = response.choices[0]?.message?.content

      // Return the analysis
      return NextResponse.json({ analysis: text })
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
