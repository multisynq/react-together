import HighlightedSpan from './HighlightedSpan'

interface CodeSpanProps {
  text: string
  className?: string
}
export default function CodeSpan({ text, className }: CodeSpanProps) {
  return <HighlightedSpan text={text} className={`bg-gray-100 text-primary font-mono text-sm ${className}`} />
}
