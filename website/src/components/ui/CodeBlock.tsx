import '@styles/CodeBlock.scss'
import { useEffect, useState } from 'react'

import { PiCode, PiCopy, PiDatabase } from 'react-icons/pi'
import { SiGithub, SiStackblitz } from 'react-icons/si'

import { Button as _Button, CodeHighlight } from '@components'
import { useCodeEditor } from '@utils/codeeditor'
import { Tooltip } from 'antd'

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

export function CodeBlock({
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
          <div className='doc-section-code-buttons animation-duration-300'>
            {codeMode !== 'basic' && !hideToggleCode && codeMode !== 'data' && (
              <>
                <Button
                  {...{
                    onClick: () => setCodeLang('javascript'),
                    className: `py-0 px-2 border-round h-2rem shadow-none${codeLang === 'javascript' && codeMode !== 'data' ? ' code-active' : ''}`,
                    tooltip: 'JavaScript Code',
                    label: 'JS',
                  }}
                />
                <Button
                  {...{
                    onClick: () => setCodeLang('typescript'),
                    className: `py-0 px-2 border-round h-2rem shadow-none${codeLang === 'typescript' ? ' code-active' : ''}`,
                    tooltip: 'TypeScript Code',
                    label: 'TS',
                  }}
                />
              </>
            )}

            {!hideToggleCode && (
              <Button
                {...{
                  onClick: () => toggleCodeMode('javascript'),
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
