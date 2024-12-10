import { CodeBlock } from '@components/ui/CodeBlock'
import Link from '@components/ui/Link'
import DocumentationDemo from '@pages/Documentation/DocumentationDemo'
import { TabPanel, TabView } from 'primereact/tabview'
import { ReactNode } from 'react'
import { GenericDocPage } from '../../GenericDocPage'
import ApiChangesPrelude from './ApiChangesPrelude'

interface GenericComponentPageProps {
  name: string
  originalName: string
  docUrl: string
  sourceCode: string
  demoCode: string
  api?: ReactNode | ReactNode[]
}
export function PrimeReactComponentDocumentationPage({ name, originalName, docUrl, api, demoCode, sourceCode }: GenericComponentPageProps) {
  const description = (
    <>
      <p>
        This component wraps PrimeReact's{' '}
        <Link to={docUrl} target='_blank'>
          {originalName}
        </Link>{' '}
        component to synchronized the state across all users.
      </p>
      <TabView>
        <TabPanel header='Preview'>
          <DocumentationDemo url={`primereact/${originalName}`} />
        </TabPanel>
        <TabPanel header='Code'>
          <CodeBlock language='tsx' code1={demoCode} />
        </TabPanel>
      </TabView>
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
      <CodeBlock language='tsx' code1={`import { ${name} } from 'react-together-primereact'`} />
      <CodeBlock language='tsx' code1={`<${name} rtKey='your-unique-key' />`} />
      <h3>Source Code</h3>
      <p>Feel free to copy the code below to adjust the component to your needs!! It's easy peasy lemon squeezy.</p>
      <CodeBlock language='tsx' code1={sourceCode} />
    </>
  )
  return <GenericDocPage title={name} description={description} usage={usage} api={api} />
}
