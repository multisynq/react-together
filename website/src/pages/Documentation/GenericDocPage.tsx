import { CodeBlock } from '@components/ui/CodeBlock'
import { ReactNode } from 'react'

interface GenericPageProps {
  title: string
  description?: ReactNode | ReactNode[]
  usage?: ReactNode | ReactNode[]
  api?: ReactNode | ReactNode[]
}
export function GenericDocPage({ title, description, usage, api }: GenericPageProps) {
  return (
    <>
      <h2 id='title'>{title}</h2>
      {description}

      <h4 id='installation'>Installation</h4>
      <CodeBlock language='bash' code1={`npm i react-together`} />

      <h4 id='usage'>Usage</h4>
      {usage}

      <h4 id='api'>API</h4>
      {api}
    </>
  )
}

export function GenericDocNav(name) {
  return [
    { key: 'title', label: name },
    { key: 'installation', label: 'Installation' },
    { key: 'usage', label: 'Usage' },
    { key: 'api', label: 'API' },
  ]
}
