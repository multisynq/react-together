import { CodeBlock, type CodeBlockCodeType } from '@components/ui'
import Link from '@components/ui/Link'
import DocumentationDemo from '@pages/Documentation/DocumentationDemo'
import { TabPanel, TabView } from 'primereact/tabview'
import { ReactNode } from 'react'
import { GenericDocPage } from '../../GenericDocPage'
import ApiChangesPrelude from './ApiChangesPrelude'

type CodeBlockData = {
  code: CodeBlockCodeType
  github?: string
}

interface GenericComponentPageProps {
  name: string
  originalName: string
  docUrl: string
  api?: ReactNode | ReactNode[]
  demo?: CodeBlockData
  source?: CodeBlockData
}
export function PrimeReactComponentDocumentationPage({ name, originalName, docUrl, api, demo, source }: GenericComponentPageProps) {
  const codes = {
    usage_1: { basic: `import { ${name} } from 'react-together-primereact'` },
    usage_2: { basic: `<${name} rtKey='your-unique-key' />` },
  }

  // Add prelude forwarding to the original documentation
  if (api) {
    api = (
      <>
        <ApiChangesPrelude {...{ docUrl }} />
        {api}
      </>
    )
  }

  return (
    <GenericDocPage
      {...{
        title: name,
        description: (
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
                <CodeBlock {...demo} />
              </TabPanel>
            </TabView>
          </>
        ),
        usage: (
          <>
            <CodeBlock code={codes.usage_1} />
            <CodeBlock code={codes.usage_2} />
          </>
        ),
        api,
        source: source && <CodeBlock {...source} />,
      }}
    />
  )
}
