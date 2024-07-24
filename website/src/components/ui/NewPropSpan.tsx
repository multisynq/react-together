import HighlightedSpan from './HighlightedSpan'

interface NewPropSpanProps {
  text: string
}
export default function NewPropSpan({ text }: NewPropSpanProps) {
  return <HighlightedSpan text={text} className='bg-green-100' />
}
