import { WithReactTogetherProvider } from '@components/sections/HeroDemo'
import { CodeBlock } from '@components/ui/CodeBlock'
import { DocumentDemoContainer } from '@components/ui/DocumentDemoContainer'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { GenericDocPage } from './GenericDocPage'

interface GenericComponentPageProps {
  name: string
  originalName: string
  docUrl: string
  ComponentDemo: () => ReactNode
}
export function GenericComponentDocPage({ name, originalName, docUrl, ComponentDemo }: GenericComponentPageProps) {
  const description = (
    <>
      <p>
        This component wraps PrimeReact's{' '}
        <Link to={docUrl} target='_blank'>
          {originalName}
        </Link>{' '}
        component to have a synchronized state across every user.
      </p>
      <div className='w-full flex items-center flex-wrap gap-3 justify-center bg-white-100'>
        <DocumentDemoContainer labelText='View 1'>
          <WithReactTogetherProvider>
            <ComponentDemo />
          </WithReactTogetherProvider>
        </DocumentDemoContainer>
        <DocumentDemoContainer labelText='View 2'>
          <WithReactTogetherProvider>
            <ComponentDemo />
          </WithReactTogetherProvider>
        </DocumentDemoContainer>
      </div>
    </>
  )

  const usage = (
    <>
      <CodeBlock language='javascript' code1={`import { ${name} } from 'react-together'`} />
      <CodeBlock language='javascript' code1={`return <${name} rtid='your-unique-id' />`} />
    </>
  )
  return <GenericDocPage title={name} description={description} usage={usage} />
}
