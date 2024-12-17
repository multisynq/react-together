import { CodeBlock } from '@components/ui/CodeBlock'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import MD from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

// The two interfaces below are used to type
// the `table` renderer
interface DomChild {
  props: DomProps
  type: string
}
interface DomProps {
  children: DomChild[]
}
interface MarkdownProps {
  children: string
}
export function Markdown({ children }: MarkdownProps) {
  return (
    <MD
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
          
          // make a code object with the language as the key
          let lang = match?.[1]
          if (lang == 'js') lang = 'javascript'
          console.log('match=', match?.[1], 'lang=', lang)
          // if (lang == 'ts') lang = 'typescript'
          const code = { [lang]: String(children)}

          return !isInline ? (
            <CodeBlock {...{ code, ...props }} />
          ) : (
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
              tr.props.children.forEach((th) => {
                columns.push({ field: th.props.children, header: th.props.children })
              })
            } else if (c.type === 'tbody') {
              // Iterate over all the <tr/>
              c.props.children.forEach((tr) => {
                const rowData = {}
                tr.props.children.forEach((td, idx) => {
                  if (idx < columns.length) {
                    rowData[columns[idx].field] = td.props.children
                  } else {
                    console.error('Table row has more columns than header')
                  }
                })
                data.push(rowData)
              })
            } else {
              console.error('Unknown table child', c)
            }
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
      {children}
    </MD>
  )
}
