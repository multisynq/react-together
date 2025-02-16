import '@styles/CodeBlock.scss'
import { useEffect, useState } from 'react'

import { PiCode, PiCodepenLogo, PiCopy, PiDatabase } from 'react-icons/pi'
import { SiGithub, SiStackblitz } from 'react-icons/si'

import { Button as _Button, CodeHighlight } from '@components'
import { openCodePen } from '@utils/codeeditor'
import { Tooltip } from 'antd'

export type CodeBlockCodeMetaData = {
  componentName: string
  usage?: string
}

export type CodeBlockCodeType = {
  basic?: string
  typescript?: string
  bash?: string
  data?: string
}

export interface CodeBlockProps {
  code: CodeBlockCodeType
  codeMetadata?: CodeBlockCodeMetaData
  embedded?: boolean
  hideToggleCode?: boolean
  stackBlitz?: string
  codepen?: boolean
  codeClassName?: string
  github?: string
}

export function CodeBlock({
  code,
  codeMetadata = null,
  embedded = false,
  hideToggleCode = false,
  stackBlitz,
  codepen = false,
  codeClassName,
  github,
}: CodeBlockProps) {
  const [codeMode, setCodeMode] = useState('basic')
  const [codeLang, setCodeLang] = useState(code?.typescript ? 'typescript' : 'basic')

  const availableCodeTypes = Object.entries(code).filter(([, value]) => value).length
  const multipleCodeTypes = availableCodeTypes > 1

  useEffect(() => {
    // if (embedded) openStackBlitz(codeLang)
    if (availableCodeTypes === 1 && code.typescript) {
      setCodeMode('typescript')
      setCodeLang('typescript')
    }

    if (availableCodeTypes === 1 && code.bash) {
      setCodeMode('bash')
      setCodeLang('bash')
    }
  }, [codeLang, embedded, availableCodeTypes, code.typescript, code.bash])

  const toggleCodeMode = (content: string) => {
    if (codeMode === 'data') setCodeMode('typescript')
    else if (codeMode === 'bash') setCodeMode('basic')
    else setCodeMode(codeMode === 'basic' ? content : 'basic')
    setCodeLang(content)
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
                {code.bash && (
                  <Button
                    {...{
                      onClick: () => setCodeLang('bash'),
                      className: `py-0 px-2 border-round h-2rem shadow-none${codeLang === 'bash' ? ' code-active' : ''}`,
                      tooltip: 'Bash Code',
                      label: 'SH',
                    }}
                  />
                )}
              </>
            )}

            {!hideToggleCode && multipleCodeTypes && (
              <Button
                {...{
                  onClick: () => toggleCodeMode(code.typescript ? 'typescript' : code.bash ? 'bash' : 'basic'),
                  tooltip: 'Toggle Full Code',
                  label: <PiCode />,
                }}
              />
            )}

            {!hideToggleCode && code?.data && (
              <Button
                {...{
                  onClick: () => setCodeMode('data'),
                  tooltip: 'View Data',
                  label: <PiDatabase />,
                }}
              />
            )}

            {stackBlitz && (
              <Button
                {...{
                  onClick: () => window.open(stackBlitz, '_blank'),
                  tooltip: 'Open in StackBlitz',
                  label: <SiStackblitz />,
                }}
              />
            )}

            {codepen && (
              <Button
                {...{
                  onClick: () =>
                    openCodePen({
                      template: 'typescript',
                      files: { [`src/${codeMetadata?.componentName || 'Component'}.tsx`]: code[codeMode] },
                      codeMetadata,
                    }),
                  tooltip: 'Edit in CodePen',
                  label: <PiCodepenLogo />,
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
