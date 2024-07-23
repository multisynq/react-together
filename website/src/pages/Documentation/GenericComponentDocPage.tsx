import { WithReactTogetherProvider } from '@components/sections/HeroDemo'
import { CodeBlock } from '@components/ui/CodeBlock'
import { FakeBrowser } from '@components/ui/FakeBrowser'
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
      <div className='w-full flex items-center flex-wrap gap-3 min-w-[32rem] justify-center bg-white-100'>
        <FakeBrowser>
          <div
            className='flex-[1_0_0] bg-[radial-gradient(65.22%_99.35%_at_76.2%_118.78%,#D7E8F8_0%,#FFF_100%)] relative'
            style={{ aspectRatio: '5 / 3' }}
          >
            <WithReactTogetherProvider>
              <ComponentDemo />
            </WithReactTogetherProvider>
          </div>
        </FakeBrowser>
        <FakeBrowser>
          <div
            className='flex-[1_0_0] bg-[radial-gradient(65.22%_99.35%_at_76.2%_118.78%,#F8F3D7_0%,#FFF_100%)] relative'
            style={{ aspectRatio: '5 / 3' }}
          >
            <WithReactTogetherProvider>
              <ComponentDemo />
            </WithReactTogetherProvider>
          </div>
        </FakeBrowser>
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
