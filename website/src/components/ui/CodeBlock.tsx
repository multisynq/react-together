import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export function CodeBlock({ language, code }) {
  return (
    <SyntaxHighlighter
      language={language}
      style={vscDarkPlus}
      customStyle={{
        padding: '20px',
        borderRadius: '5px',
        fontSize: '14px',
      }}
      className='w-full'
    >
      {code}
    </SyntaxHighlighter>
  )
}
