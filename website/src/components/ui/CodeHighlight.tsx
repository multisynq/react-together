import { useEffect, useRef } from 'react'

interface CodeHighlightProps {
  code: string
  lang?: string
  style?: React.CSSProperties
  codeClassName?: string
}

export default function CodeHighlight({ code, lang, style, codeClassName }: CodeHighlightProps) {
  const codeElement = useRef()
  const languageClassName = `language-${lang || 'jsx'}`

  code = `\n${code.trim()}\n`

  useEffect(() => {
    // @ts-expect-error - Prism is a global variable
    window.Prism.highlightElement(codeElement.current)
  }, [])

  return (
    <div className={codeClassName || ''}>
      <pre {...{ style, tabIndex: -1 }}>
        <code ref={codeElement} className={languageClassName}>
          {code}&nbsp;
        </code>
      </pre>
    </div>
  )
}
