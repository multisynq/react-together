import { CodeBlock } from '@components/ui/CodeBlock'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

interface MarkdownPageProps {
  markdown: string
}
export function MarkdownPage({ markdown }: MarkdownPageProps) {
  return (
    <div className='w-full'>
      <div className='max-w-[1324px] line-border bg-white px-5'>
        <Markdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          className='markdown-content'
          components={{
            // a: ({ node, ...props }) => {
            //   return <Link to={node.properties.href as string} target='_blank' {...props} />
            // },
            code: ({ className, children, ...props }) => {
              const isInline = children.toString().split('\n').length === 1
              const match = /language-(\w+)/.exec(className || '')
              return !isInline ? (
                <CodeBlock language={match?.[1]} code1={String(children)} {...props} />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
          }}
        >
          {markdown}
        </Markdown>
      </div>
    </div>
  )
}
