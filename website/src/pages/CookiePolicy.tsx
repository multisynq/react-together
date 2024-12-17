import cookiePolicy from '@pages/CookiePolicy.md'
import { MarkdownPage } from './Documentation/MarkdownPage'

export function CookiePolicy() {
  return (
    <div className='flex justify-center'>
      <MarkdownPage markdown={cookiePolicy} />
    </div>
  )
}
