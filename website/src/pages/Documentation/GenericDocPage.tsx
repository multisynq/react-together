import { ReactNode, useRef } from 'react'

interface GenericPageProps {
  title: string
  parameter?: string
  description?: ReactNode | ReactNode[]
  usage?: ReactNode | ReactNode[]
  api?: ReactNode | ReactNode[]
  source?: ReactNode | ReactNode[]
  id?: string
}
export function GenericDocPage({ title, description, usage, api, source, id }: GenericPageProps) {
  const ref = useRef(null)
  return (
    <>
      <div className='flex gap-2 items-baseline break-all'>
        <h2 id={id ?? 'title'} ref={ref}>
          {title}
        </h2>
        {/* <span>{parameter}</span> */}
      </div>
      {description}

      {/* <h4 id='installation'>Installation</h4>
      <CodeBlock language='bash' codeShort={`npm i react-together`} /> */}

      {usage && (
        <>
          <h3 id='usage'>Usage</h3>
          {usage}
        </>
      )}

      {api && (
        <>
          <h3 id='api'>API</h3>
          {api}
        </>
      )}

      {source && (
        <>
          <h3 id='source'>Source Code</h3>
          {source}
        </>
      )}
    </>
  )
}

interface GenericDocNavOptions {
  exclude?: string[]
}
export function GenericDocNav(name, { exclude = [] }: GenericDocNavOptions = {}) {
  return [
    { key: 'title', label: name },
    // { key: 'installation', label: 'Installation' },
    { key: 'usage', label: 'Usage' },
    { key: 'api', label: 'API' },
    { key: 'source', label: 'Source Code' },
  ].filter(({ key }) => !exclude.includes(key))
}
