import HighlightedSpan from './HighlightedSpan'

interface CodeSpanProps {
  text: string
}
export default function CodeSpan({ text }: CodeSpanProps) {
  return <HighlightedSpan text={text} className='bg-gray-100 text-gray-900 font-mono text-sm' />
}
