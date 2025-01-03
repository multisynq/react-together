import 'primeicons/primeicons.css'
import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'

export function InstallCodeBlock({ language, codeShort }) {
  const [copySuccess, setCopySuccess] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(codeShort)
      .then(() => {
        setCopySuccess(true)
        setTimeout(() => setCopySuccess(false), 2000)
      })
      .catch((err) => console.error('Failed to copy text: ', err))
  }

  return (
    <div className='relative w-56'>
      <div className='top-1.5 right-3 absolute flex gap-2'>
        <button
          onClick={copyToClipboard}
          className='text-black font-bold p-2 w-8 h-8 rounded text-sm flex items-center justify-center'
          title={copySuccess ? 'Copied!' : 'Copy'}
        >
          <i className={copySuccess ? 'pi pi-check' : 'pi pi-copy'} style={{ fontSize: '1rem' }}></i>
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={'coldark-cold'}
        customStyle={{
          paddingTop: '12px',
          paddingBottom: '12px',
          paddingLeft: '16px',
          paddingRight: '16px',
          borderRadius: '16px',
          fontSize: '14px',
          marginTop: 0,
          marginBottom: 0,
        }}
        className='w-full line-border'
      >
        {codeShort}
      </SyntaxHighlighter>
    </div>
  )
}
