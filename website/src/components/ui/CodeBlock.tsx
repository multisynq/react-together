import '@styles/CodeBlock.scss'

import { PiCode, PiCopy, PiDatabase } from 'react-icons/pi'
import { SiGithub, SiStackblitz } from 'react-icons/si'

import { Button, CodeHighlight } from '@components'
import { useCodeEditor } from '@utils/codeeditor'
import { useEffect, useState } from 'react'

export type CodeBlockCodeType = {
  basic?: string
  javascript?: string
  typescript?: string
  bash?: string
  data?: string
}

interface CodeBlockProps {
  code: CodeBlockCodeType
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

  const btnClass = 'h-2rem w-2rem p-0 inline-flex align-items-center justify-content-center shadow-none'

  return (
    <>
      {!embedded && (
        <div className='doc-section-code'>
          <div className='doc-section-code-buttons animation-duration-300'>
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
                className={btnClass}
                // tooltip='Toggle Full Code'
                // tooltipOptions={{ position: 'bottom', className: 'doc-section-code-tooltip' }}
              >
                <PiCode />
              </Button>
            )}

            {!hideToggleCode && code?.data ? (
              <Button
                type='button'
                onClick={() => setCodeMode('data')}
                className={btnClass}
                // tooltip='View Data'
                // tooltipOptions={{ position: 'bottom', className: 'doc-section-code-tooltip' }}
              >
                <PiDatabase />
              </Button>
            ) : null}

            {!hideStackBlitz && (
              <Button
                type='button'
                className={btnClass}
                onClick={() => codeEditor.openStackBlitz(codeLang)}
                // tooltip='Edit in StackBlitz'
                // tooltipOptions={{ position: 'bottom', className: 'doc-section-code-tooltip' }}
              >
                <SiStackblitz />
              </Button>
            )}

            {github && (
              <Button
                type='button'
                className={btnClass}
                onClick={() => window.open(github, '_blank')}
                // tooltip='View on GitHub'
                // tooltipOptions={{ position: 'bottom', className: 'doc-section-code-tooltip' }}
              >
                <SiGithub />
              </Button>
            )}

            <Button
              type='button'
              onClick={copyCode}
              className={btnClass}
              // tooltip='Copy Code'
              // tooltipOptions={{ position: 'bottom', className: 'doc-section-code-tooltip' }}
            >
              <PiCopy />
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
