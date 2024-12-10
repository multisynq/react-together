import { CodeBlock } from '@components/ui'
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
  github?: string
}
export function PrimeReactComponentDocumentationPage({
  name,
  originalName,
  docUrl,
  api,
  sourceCode,
  demoCode,
  github,
}: GenericComponentPageProps) {
  const codes = {
    demo: {
      basic: demoCode,
      // basic: 'Hello Basic',
      typescript: `Hello I'm TS`,
      javascript: `Hello I'm JS`,
    },

    usage_1: { basic: `import { ${name} } from 'react-together-primereact'` },
    usage_2: { basic: `<${name} rtKey='your-unique-key' />` },
  }

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
          {/* <CodeBlock
            {...{
              language: 'tsx',
              codeShort: sourceCode,
              github,
            }}
          /> */}
          <CodeBlock {...{ code: codes.demo, github }} />
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
      <CodeBlock code={codes.usage_1} />
      <CodeBlock code={codes.usage_2} />
    </>
  )
  return <GenericDocPage {...{ title: name, description, usage, api }} />
}
