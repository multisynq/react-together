import { CodeBlock } from '@components/ui/CodeBlock'
import Link from '@components/ui/Link'
import DocumentationDemo from '@pages/Documentation/DocumentationDemo'
import { ReactNode } from 'react'
import { GenericDocPage } from '../../GenericDocPage'
import ApiChangesPrelude from './ApiChangesPrelude'

interface GenericComponentPageProps {
  name: string
  originalName: string
  docUrl: string
  api?: ReactNode | ReactNode[]
}
export function PrimeReactComponentDocumentationPage({ name, originalName, docUrl, api }: GenericComponentPageProps) {
  const description = (
    <>
      <p>
        This component wraps PrimeReact's{' '}
        <Link to={docUrl} target='_blank'>
          {originalName}
        </Link>{' '}
        component to synchronized the state across all users.
      </p>
      <DocumentationDemo url={`primereact/${originalName}`} />
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
      <CodeBlock language='jsx' code1={`return <${name} rtKey='your-unique-key' />`} />
    </>
  )
  return <GenericDocPage title={name} description={description} usage={usage} api={api} />
}
