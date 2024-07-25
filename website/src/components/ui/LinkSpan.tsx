import { Link } from 'react-router-dom'
import HighlightedSpan from './HighlightedSpan'

interface LinkSpanProps {
  text: string
  to: string
}
export default function LinkSpan({ text, to }: LinkSpanProps) {
  return (
    <Link to={to}>
      <HighlightedSpan text={text} className='bg-blue-100 underline' />
    </Link>
  )
}
