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
      Based on the following quiz answers, provide a detailed and comprehensive analysis of the child's talents and strengths:

      ${answers.map((answer: string, index: number) => `Question ${index + 1}: ${answer}`).join('\n')}

      Instructions for the analysis:
      1. **Summary of the child's top 3 talent areas**: Write a detailed paragraph of at least 5-7 sentences explaining why these areas stand out, supported by examples or reasoning derived from the answers.
      2. **In-depth analysis of each talent area**: For each talent area, write a full paragraph (8-10 sentences) discussing what the talent implies, how it reflects in the answers, and the potential benefits of developing it. Use descriptive language and provide examples or hypothetical scenarios to make the analysis more relatable.
      3. **Suggestions for further development**: Provide at least 2 paragraphs with actionable advice, including specific activities, books, tools, or programs to nurture these talents. Explain how these suggestions align with the identified talents and why they are beneficial.
      4. **Additional insights or patterns**: Conclude with a paragraph (at least 6-8 sentences) identifying any notable patterns, unique traits, or areas of potential growth. End with an encouraging and positive tone to inspire the child's development.

      Make sure each paragraph is well-developed, cohesive, and elaborates on the points mentioned. The goal is to provide parents or educators with a thorough understanding of the child's abilities and actionable recommendations for growth.
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
                'You are an AI assistant specializing in child development and talent analysis. Provide long, detailed, and insightful advice based on the quiz results.',
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
