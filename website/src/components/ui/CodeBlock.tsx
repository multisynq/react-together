import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

export function CodeBlock({ language, code1, code2 }) {
  const [copySuccess, setCopySuccess] = useState(false)
  const [showCode1, setShowCode1] = useState(true)

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(showCode1 ? code1 : code2)
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
      <button
        onClick={copyToClipboard}
        className='absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded text-sm'
      >
        {copySuccess ? 'Copied!' : 'Copy'}
      </button>
      <button
        onClick={toggleCode}
        className='absolute top-2 right-20 bg-gray-700 hover:bg-gray-600 text-white font-bold py-1 px-2 rounded text-sm'
      >
        Toggle Code
      </button>
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
        {showCode1 ? code1 : code2}
      </SyntaxHighlighter>
    </div>
  )
}
