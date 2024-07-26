interface HighlightedSpanProps {
  text: React.ReactNode
  className?: string
}
export default function HighlightedSpan({ text, className = '' }: HighlightedSpanProps) {
  return <span className={'inline-block rounded px-1 py-0.5' + ' ' + className}>{text}</span>
}
