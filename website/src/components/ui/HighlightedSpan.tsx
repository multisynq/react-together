interface HighlightedSpanProps {
  text: React.ReactNode
  className?: string
}
export default function HighlightedSpan({ text, className = '' }: HighlightedSpanProps) {
  return <span className={'inline-block rounded px-2 py-1' + ' ' + className}>{text}</span>
}
