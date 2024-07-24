import HighlightedSpan from './HighlightedSpan'

interface NewPropSpanProps {
  text: string
}
export default function RemovedPropSpan({ text }: NewPropSpanProps) {
  return <HighlightedSpan text={<s>{text}</s>} className='bg-red-100' />
}
