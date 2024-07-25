import { useState } from 'react'

interface OverfillSpanProps {
  text?: string
}

const TRUNCATION_LENGTH = 54

export default function OverfillSpan({ text = '' }: OverfillSpanProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleText = () => {
    setIsExpanded(!isExpanded)
  }

  const displayedText = isExpanded ? text : text.substring(0, TRUNCATION_LENGTH) + (text.length > TRUNCATION_LENGTH ? '...' : '')

  return (
    <div>
      <span>{displayedText}</span>
      {text.length > TRUNCATION_LENGTH && (
        <button className='rounded-md px-2 border-1 border-gray-700 shadow-lineStyleDark py-0 ml-2' onClick={toggleText}>
          {isExpanded ? '-' : '+'}
        </button>
      )}
    </div>
  )
}
