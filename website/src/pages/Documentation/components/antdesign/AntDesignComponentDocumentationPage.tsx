import { CodeBlock, type CodeBlockCodeType } from '@components/ui'
import Link from '@components/ui/Link'
import DocumentationDemo from '@pages/Documentation/DocumentationDemo'
import getDocLinks from '@utils/getDocLinks'
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
  docUrl?: string
  demo: CodeBlockData
  source: CodeBlockData
  api?: ReactNode | ReactNode[]
  demoUrl?: string
}
export function AntDesignComponentDocumentationPage({ name, originalName, docUrl, api, demo, source, demoUrl }: GenericComponentPageProps) {
  const codes = {
    usage_1: { basic: `import { ${name} } from 'react-together-ant-design'` },
    usage_2: { basic: `<${name} rtKey='your-unique-key' />` },
  }

  const { doc_antdesign, github_demo, github_source } = getDocLinks({ ad_name: originalName, rt_name: name })

  if (!demo.github) demo.github = github_demo
  if (!source.github) source.github = github_source
  if (!docUrl) docUrl = doc_antdesign

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
              This component wraps Ant Design's{' '}
              <Link to={docUrl} target='_blank'>
                {originalName}
              </Link>{' '}
              component to synchronize the state across all users.
            </p>
            <TabView className='w-full'>
              <TabPanel header='Preview'>
                <DocumentationDemo url={demoUrl ?? `antdesign/${originalName}`} />
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
