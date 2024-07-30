import { CodeBlock } from '@components/ui/CodeBlock'
import DocumentationDemo from '@pages/Documentation/DocumentationDemo'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { GenericDocPage } from '../../GenericDocPage'
import ApiChangesPrelude from './ApiChangesPrelude'

interface GenericComponentPageProps {
  name: string
  originalName: string
  docUrl: string
  api?: ReactNode | ReactNode[]
  ComponentDemo: () => ReactNode
}
export function PrimeReactComponentDocumentationPage({ name, originalName, docUrl, ComponentDemo, api }: GenericComponentPageProps) {
  const description = (
    <>
      <p>
        This component wraps PrimeReact's{' '}
        <Link className='text-blue-600 rounded-sm bg-slate-100 px-1' to={docUrl} target='_blank'>
          {originalName}
        </Link>{' '}
        component to synchronized the state across all users.
      </p>
      <DocumentationDemo>
        <ComponentDemo />
      </DocumentationDemo>
    </>
  )

  // Add prelude forwarding to the original documentation
  if (api) {
    api = (
      <>
        <ApiChangesPrelude docUrl={docUrl} />
        {api}
      </>
    )
  }

  const usage = (
    <>
      <CodeBlock language='jsx' code1={`import { ${name} } from 'react-together'`} />
      <CodeBlock language='jsx' code1={`return <${name} rtid='your-unique-id' />`} />
    </>
  )
  return <GenericDocPage title={name} description={description} usage={usage} api={api} />
}
