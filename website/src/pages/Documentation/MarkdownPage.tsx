import { Markdown } from '@components/Markdown'

interface MarkdownPageProps {
  markdown: string
}
export function MarkdownPage({ markdown }: MarkdownPageProps) {
  return (
    <div className='flex justify-center w-full'>
      <div className='max-w-[54rem] line-border bg-white px-6 py-4'>
        <Markdown>{markdown}</Markdown>
      </div>
    </div>
  )
}
