import { CodeBlock, CodeBlockProps } from '@components/ui'
import Link from '@components/ui/Link'
import DocumentationDemo from '@pages/Documentation/DocumentationDemo'
import getDocLinks from '@utils/getDocLinks'
import { TabPanel, TabView } from 'primereact/tabview'
import { ReactNode } from 'react'
import { GenericDocPage } from '../../GenericDocPage'
import ApiChangesPrelude from './ApiChangesPrelude'

interface GenericComponentPageProps {
  name: string
  originalName: string
  docUrl?: string
  api?: ReactNode | ReactNode[]
  demo: CodeBlockProps
  source: CodeBlockProps
}
export function PrimeReactComponentDocumentationPage({ name, originalName, docUrl, api, demo, source }: GenericComponentPageProps) {
  const codes = {
    usage_1: { basic: `import { ${name} } from 'react-together-primereact'` },
    usage_2: { basic: `<${name} rtKey='your-unique-key' />` },
  }

  const { doc_primereact, github_demo, github_source } = getDocLinks({ pr_name: originalName, rt_name: name })

  if (!demo.github) demo.github = github_demo
  if (!source.github) source.github = github_source
  if (!docUrl) docUrl = doc_primereact

  function addMetaData(code: CodeBlockProps) {
    return { ...code, codeMetadata: { componentName: name, usage: codes.usage_2.basic } }
  }

  demo = addMetaData(demo)
  source = addMetaData(source)

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
        id: 'title',
        description: (
          <>
            <p>
              This component wraps PrimeReact's{' '}
              <Link to={docUrl} target='_blank'>
                {originalName}
              </Link>{' '}
              component to synchronized the state across all users.
            </p>
            <TabView className='w-full'>
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
            <CodeBlock {...{ code: codes.usage_1 }} />
            <CodeBlock {...{ code: codes.usage_2 }} />
          </>
        ),
        api,
        source: <CodeBlock {...source} />,
      }}
    />
  )
}
