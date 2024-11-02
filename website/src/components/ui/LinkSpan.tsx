import { Link, LinkProps } from 'react-router-dom'
import HighlightedSpan from './HighlightedSpan'

interface LinkSpanProps extends LinkProps {
  text: string
}
export default function LinkSpan({ text, ...props }: LinkSpanProps) {
  return (
    <Link {...props}>
      <HighlightedSpan text={text} className='bg-blue-100 underline' />
    </Link>
  )
}
