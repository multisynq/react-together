import { Button, CodeHighlight } from '@components'
import { useCodeEditor } from '@utils/codeeditor'
import { useEffect, useState } from 'react'

interface CodeBlockProps {
  code: {
    basic?: string
    javascript?: string
    typescript?: string
    bash?: string
    data?: string
  }
  embedded?: boolean
  hideToggleCode?: boolean
  hideStackBlitz?: boolean
  codeClassName?: string
  github?: string
}

export default function CodeBlock({
  code,
  embedded = false,
  hideToggleCode = false,
  hideStackBlitz = false,
  codeClassName,
  github,
}: CodeBlockProps) {
  const [codeMode, setCodeMode] = useState('basic')
  const [codeLang, setCodeLang] = useState(code?.javascript ? 'javascript' : 'basic')
  const codeEditor = useCodeEditor({ template: 'vite' })

  useEffect(() => {
    if (embedded) codeEditor.openStackBlitz(codeLang)
  }, [codeEditor, codeLang, embedded])

  const toggleCodeMode = (content: string) => {
    if (codeMode === 'data') setCodeMode('javascript')
    else setCodeMode(codeMode === 'basic' ? content : 'basic')
    setCodeLang('javascript')
  }

  const copyCode = async () => await navigator.clipboard.writeText(code[codeLang])

  return (
    <>
      {!embedded && (
        <div className='doc-section-code'>
          <div className='doc-section-code-buttons scalein animation-duration-300'>
            {codeMode !== 'basic' && !hideToggleCode && codeMode !== 'data' && (
              <>
                <Button
                  onClick={() => setCodeLang('javascript')}
                  className={`py-0 px-2 border-round h-2rem shadow-none${codeLang === 'javascript' && codeMode !== 'data' ? ' code-active' : ''}`}
                  // label='JS'
                  // tooltip='JavaScript Code'
                  // tooltipOptions={{ position: 'bottom', className: 'doc-section-code-tooltip' }}
                />
                <Button
                  onClick={() => setCodeLang('typescript')}
                  className={`py-0 px-2 border-round h-2rem shadow-none${codeLang === 'typescript' ? ' code-active' : ''}`}
                  // label='TS'
                  // tooltip='TypeScript Code'
                  // tooltipOptions={{ position: 'bottom', className: 'doc-section-code-tooltip' }}
                />
              </>
            )}

            {!hideToggleCode && (
              <Button
                type='button'
                onClick={() => toggleCodeMode('javascript')}
                className='h-2rem w-2rem p-0 inline-flex align-items-center justify-content-center shadow-none'
                // tooltip='Toggle Full Code'
                // tooltipOptions={{ position: 'bottom', className: 'doc-section-code-tooltip' }}
              >
                <i className='pi pi-code' />
              </Button>
            )}

            {!hideToggleCode && code?.data ? (
              <Button
                type='button'
                onClick={() => setCodeMode('data')}
                className='h-2rem w-2rem p-0 inline-flex align-items-center justify-content-center shadow-none'
                // tooltip='View Data'
                // tooltipOptions={{ position: 'bottom', className: 'doc-section-code-tooltip' }}
              >
                <i className='pi pi-database' />
              </Button>
            ) : null}

            {!hideStackBlitz && (
              <Button
                type='button'
                className='h-2rem w-2rem p-0 inline-flex align-items-center justify-content-center shadow-none'
                onClick={() => codeEditor.openStackBlitz(codeLang)}
                // tooltip='Edit in StackBlitz'
                // tooltipOptions={{ position: 'bottom', className: 'doc-section-code-tooltip' }}
              >
                <svg role='img' viewBox='0 0 13 19' width={13} height={18} fill={'currentColor'} style={{ display: 'block' }}>
                  <path d='M0 10.6533H5.43896L2.26866 18.1733L12.6667 7.463H7.1986L10.3399 0L0 10.6533Z' />
                </svg>
              </Button>
            )}

            {github && (
              <Button
                type='button'
                className='h-2rem w-2rem p-0 inline-flex align-items-center justify-content-center shadow-none'
                onClick={() => window.open(github, '_blank')}
                // tooltip='View on GitHub'
                // tooltipOptions={{ position: 'bottom', className: 'doc-section-code-tooltip' }}
              >
                <i className='pi pi-github' />
              </Button>
            )}

            <Button
              type='button'
              onClick={copyCode}
              className='h-2rem w-2rem p-0 inline-flex align-items-center justify-content-center shadow-none'
              // tooltip='Copy Code'
              // tooltipOptions={{ position: 'bottom', className: 'doc-section-code-tooltip' }}
            >
              <i className='pi pi-copy' />
            </Button>
          </div>

          {/* {JSON.stringify({ codeMode, code })} */}
          {/* {codeMode === 'basic' && JSON.stringify(code?.basic)} */}

          {codeMode === 'basic' && <CodeHighlight {...{ code: code?.basic, codeClassName }} />}
          {codeMode === 'bash' && <CodeHighlight {...{ code: code?.bash, lang: 'bash', codeClassName }} />}
          {codeMode === 'data' && <CodeHighlight {...{ code: code?.data, lang: 'json', codeClassName }} />}
          {codeMode !== 'basic' && codeLang === 'javascript' && <CodeHighlight {...{ code: code?.javascript, codeClassName }} />}
          {codeMode !== 'basic' && codeLang === 'typescript' && (
            <CodeHighlight {...{ code: code?.typescript, lang: 'tsx', codeClassName }} />
          )}
        </div>
      )}
      {embedded && <div id='embed' />}
    </>
  )
}
