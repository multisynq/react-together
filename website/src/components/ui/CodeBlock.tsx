import 'primeicons/primeicons.css'
import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
  language: string
  code1: string
  code2?: string
}

export function CodeBlock({ language, code1, code2 }: CodeBlockProps) {
  const [copySuccess, setCopySuccess] = useState(false)
  const [showCode1, setShowCode1] = useState(true)

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(code2 && !showCode1 ? code2 : code1)
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
        {code2 && (
          <button
            onClick={toggleCode}
            className='bg-gray-700 hover:bg-gray-600 text-white font-bold p-2 w-8 h-8 rounded-lg text-sm flex items-center justify-center'
            title='Toggle Code'
          >
            <i className='pi pi-code' style={{ fontSize: '1rem' }}></i>
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
        {code2 && !showCode1 ? String(code2) : String(code1)}
      </SyntaxHighlighter>
    </div>
  )
}
