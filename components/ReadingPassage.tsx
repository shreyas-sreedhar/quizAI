import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp } from "lucide-react"

interface ReadingPassageProps {
  passage?: string 
}

export default function ReadingPassage({ passage }: ReadingPassageProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="mb-8 bg-gray-100 p-4 rounded-lg">
      <div className={`prose max-w-none ${isExpanded ? "" : "max-h-48 overflow-hidden"}`}>
        {passage && passage.split("\n").map((paragraph, index) => (
          <p key={index} className="mb-2">
            {paragraph.trim()}
          </p>
        ))}
      </div>
      <Button
        variant="ghost"
        className="mt-2 w-full flex items-center justify-center"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <>
            <ChevronUp className="mr-2 h-4 w-4" /> Show Less
          </>
        ) : (
          <>
            <ChevronDown className="mr-2 h-4 w-4" /> Read More
          </>
        )}
      </Button>
    </div>
  )
}

