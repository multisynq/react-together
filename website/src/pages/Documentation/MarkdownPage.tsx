import { CodeBlock } from '@components/ui'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import Markdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

interface DomChild {
  type: string
  props: {
    children: DomChild[] | DomChild
  }
}

interface MarkdownPageProps {
  markdown: string
}
export function MarkdownPage({ markdown }: MarkdownPageProps) {
  return (
    <div className='flex justify-center w-full'>
      <div className='max-w-[54rem] line-border bg-white px-6 py-4'>
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
                // <CodeBlock language={match?.[1]} codeShort={String(children)} {...props} />
                // <CodeBlock code={{ [match?.[1] || 'javascript']: String(children) }} {...props} />
                <CodeBlock code={{ [match?.[1] || 'basic']: String(children) }} {...props} />
              ) : (
                // match?.[1] || 'basic'
                <code className={className} {...props}>
                  {children}
                </code>
              )
            },
            table: (props) => {
              const children = props.children as DomChild[]
              const columns = []
              const data = []
              children.forEach((c) => {
                if (c.type === 'thead') {
                  // Here we know that tr is not inside an array
                  const tr = c.props.children as unknown as DomChild
                  const children = Array.isArray(tr.props.children) ? tr.props.children : [tr.props.children]
                  children.forEach((th) => columns.push({ field: th.props.children, header: th.props.children }))
                } else if (c.type === 'tbody') {
                  // Iterate over all the <tr/>
                  const rows = Array.isArray(c.props.children) ? c.props.children : [c.props.children]
                  rows.forEach((tr) => {
                    const rowData = {}
                    const cells = Array.isArray(tr.props.children) ? tr.props.children : [tr.props.children]
                    cells.forEach((td, idx) => {
                      if (idx < columns.length) rowData[columns[idx].field] = td.props.children
                      else console.error('Table row has more columns than header')
                    })
                    data.push(rowData)
                  })
                } else console.error('Unknown table child', c)
              })

              return (
                <DataTable value={data}>
                  {columns.map((c) => (
                    <Column key={c.field} {...c} />
                  ))}
                </DataTable>
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
