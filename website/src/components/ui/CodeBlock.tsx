import 'primeicons/primeicons.css'
import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
  language: string
  codeShort: string
  codeLong?: string
  stackblitz?: boolean
  github?: string
}

export function CodeBlock({ language, codeShort, codeLong, stackblitz, github }: CodeBlockProps) {
  const [copySuccess, setCopySuccess] = useState(false)
  const [showCode1, setShowCode1] = useState(true)

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(codeLong && !showCode1 ? codeLong : codeShort)
      .then(() => {
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
      })
      .catch((err) => console.error('Failed to copy text: ', err))
  }

  const toggleCode = () => {
    setShowCode1(!showCode1)
  }

  return (
    <div className='relative w-full'>
      <div className='top-2 right-2 absolute flex gap-2 z-10'>
        {codeLong && (
          <button
            onClick={toggleCode}
            className='bg-gray-700 hover:bg-gray-600 text-white font-bold p-2 w-8 h-8 rounded-lg text-sm flex items-center justify-center'
            title='Toggle Code'
          >
            <i className='pi pi-code' style={{ fontSize: '1rem' }}></i>
          </button>
        )}

        {stackblitz && (
          <button
            onClick={() => window.open('https://stackblitz.com/edit/stackblitz-generator', '_blank')}
            className='bg-gray-700 hover:bg-gray-600 text-white font-bold p-2 w-8 h-8 rounded-lg text-sm flex items-center justify-center'
            title='Edit on StackBlitz'
          >
            <i className='pi pi-stackblitz' style={{ fontSize: '1rem' }}></i>
          </button>
        )}

        {github && (
          <button
            onClick={() => window.open(github, '_blank')}
            className='bg-gray-700 hover:bg-gray-600 text-white font-bold p-2 w-8 h-8 rounded-lg text-sm flex items-center justify-center'
            title='View on GitHub'
          >
            <i className='pi pi-github' style={{ fontSize: '1rem' }}></i>
          </button>
        )}

        <button
          onClick={copyToClipboard}
          className='bg-gray-700 hover:bg-gray-600 text-white font-bold p-2 w-8 h-8 rounded-lg text-sm flex items-center justify-center'
          title={copySuccess ? 'Copied!' : 'Copy'}
        >
          <i className={copySuccess ? 'pi pi-check' : 'pi pi-copy'} style={{ fontSize: '1rem' }}></i>
        </button>
      </div>
      <SyntaxHighlighter
        lineProps={{ style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }}
        wrapLines={true}
        language={language}
        style={vscDarkPlus}
        customStyle={{
          paddingLeft: '32px',
          paddingRight: '32px',
          paddingTop: '18px',
          paddingBottom: '18px',
          borderRadius: '16px',
          fontSize: '14px',
          marginTop: 0,
          marginBottom: 0,
        }}
      >
        {codeLong && !showCode1 ? String(codeLong) : String(codeShort)}
      </SyntaxHighlighter>
    </div>
  )
}
