import { CodeBlock } from '@components/ui/CodeBlock'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

interface MarkdownPageProps {
  markdown: string
}
export function MarkdownPage({ markdown }: MarkdownPageProps) {
  return (
    <div className='px-36'>
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        className='markdown-content'
        components={{
          // a: ({ node, ...props }) => {
          //   console.log(node)
          //   return <Link to={node.properties.href as string} target='_blank' {...props} />
          // },
          code: ({ node, inline, className, children, ...props }) => {
            console.log('Rendering code', { node, inline, className, children, props })
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <CodeBlock language={match[1]} code1={String(children)} {...props} />
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
  )
}
