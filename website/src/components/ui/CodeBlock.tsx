import '@styles/CodeBlock.scss'
import { useEffect, useState } from 'react'

import { PiCode, PiCopy, PiDatabase } from 'react-icons/pi'
import { SiGithub, SiStackblitz } from 'react-icons/si'

import { Button as _Button, CodeHighlight } from '@components'
import { useCodeEditor } from '@utils/codeeditor'
import { Tooltip } from 'antd'

export type CodeBlockCodeType = {
  basic?: string
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

export function CodeBlock({
  code,
  embedded = false,
  hideToggleCode = false,
  hideStackBlitz = true,
  codeClassName,
  github,
}: CodeBlockProps) {
  const [codeMode, setCodeMode] = useState('basic')
  const [codeLang, setCodeLang] = useState(code?.typescript ? 'typescript' : 'basic')
  const codeEditor = useCodeEditor({ template: 'vite' })

  const availableCodeTypes = Object.entries(code).filter(([, value]) => value).length
  const multipleCodeTypes = availableCodeTypes > 1

  useEffect(() => {
    if (embedded) codeEditor?.openStackBlitz(codeLang)
    if (availableCodeTypes === 1 && code.typescript) {
      setCodeMode('typescript')
      setCodeLang('typescript')
    }
  }, [codeEditor, codeLang, embedded, availableCodeTypes, code.typescript])

  const toggleCodeMode = (content: string) => {
    if (codeMode === 'data') setCodeMode('typescript')
    else setCodeMode(codeMode === 'basic' ? content : 'basic')
    setCodeLang('typescript')
  }

  const copyCode = async () => await navigator.clipboard.writeText(code[codeLang])

  if (Object.keys(code).length <= 1) hideToggleCode = true

  return (
    <>
      {!embedded && (
        <div className='doc-section-code'>
          <div className='doc-section-code-buttons animation-duration-300'>
            {(codeMode !== 'basic' || availableCodeTypes === 1) && !hideToggleCode && codeMode !== 'data' && (
              <>
                {code.typescript && (
                  <Button
                    {...{
                      onClick: () => setCodeLang('typescript'),
                      className: `py-0 px-2 border-round h-2rem shadow-none${codeLang === 'typescript' ? ' code-active' : ''}`,
                      tooltip: 'TypeScript Code',
                      label: 'TS',
                    }}
                  />
                )}
              </>
            )}

            {!hideToggleCode && multipleCodeTypes && (
              <Button
                {...{
                  onClick: () => toggleCodeMode('typescript'),
                  tooltip: 'Toggle Full Code',
                  label: <PiCode />,
                }}
              />
            )}

            {!hideToggleCode && code?.data ? (
              <Button
                {...{
                  onClick: () => setCodeMode('data'),
                  tooltip: 'View Data',
                  label: <PiDatabase />,
                }}
              />
            ) : null}

            {!hideStackBlitz && (
              <Button
                {...{
                  onClick: () => codeEditor.openStackBlitz(codeLang),
                  tooltip: 'Edit in StackBlitz',
                  label: <SiStackblitz />,
                }}
              />
            )}

            {github && (
              <Button
                {...{
                  onClick: () => window.open(github, '_blank'),
                  tooltip: 'View on GitHub',
                  label: <SiGithub />,
                }}
              />
            )}

            <Button
              {...{
                onClick: copyCode,
                tooltip: 'Copy Code',
                label: <PiCopy />,
              }}
            />
          </div>

          {codeMode === 'basic' && <CodeHighlight {...{ code: code?.basic, codeClassName }} />}
          {codeMode === 'bash' && <CodeHighlight {...{ code: code?.bash, lang: 'bash', codeClassName }} />}
          {codeMode === 'data' && <CodeHighlight {...{ code: code?.data, lang: 'json', codeClassName }} />}
          {codeMode !== 'basic' && (codeLang === 'typescript' || codeLang === 'tsx') && (
            <CodeHighlight {...{ code: code?.typescript, lang: 'tsx', codeClassName }} />
          )}
        </div>
      )}
      {embedded && <div id='embed' />}
    </>
  )
}

interface ButtonProps {
  className?: string
  label: string | JSX.Element
  tooltip?: string
  tooltipPlacement?:
    | 'top'
    | 'bottom'
    | 'left'
    | 'right'
    | 'topLeft'
    | 'topRight'
    | 'bottomLeft'
    | 'bottomRight'
    | 'leftTop'
    | 'leftBottom'
    | 'rightTop'
    | 'rightBottom'
  onClick: () => void
}

function Button({ className, label, tooltip, tooltipPlacement, onClick, ...props }: ButtonProps) {
  return (
    <Tooltip {...{ title: tooltip, placement: tooltipPlacement || 'bottom' }}>
      <_Button
        {...{
          onClick,
          className: className || `h-2rem w-2rem p-0 inline-flex align-items-center justify-content-center shadow-none`,
          ...props,
        }}
      >
        {label}
      </_Button>
    </Tooltip>
  )
}
