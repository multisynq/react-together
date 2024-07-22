import { NavItem } from './types'
import { CodeBlockExample } from '@components/ui/CodeBlockExample'
import { CodeBlock } from '@components/ui/CodeBlock'
import { FakeBrowser } from '@components/ui/FakeBrowser'
import { WithReactTogetherProvider } from '@components/sections/HeroDemo'
import { Link } from 'react-router-dom'
import { CheckboxTogether } from 'react-together'


export const PrimeReactPage: React.FC = () => {
  const name = 'CheckboxTogether'
  return (
    <>
        <h2 id='component-name'>{name}</h2>
        <p>
          This component wraps PrimeReact's{' '}
          <Link to='https://primereact.org/calendar/' target='_blank'>
            Calendar
          </Link>{' '}
          component
        </p>
        <div className='w-full flex items-center flex-wrap gap-3 min-w-[32rem] justify-center bg-white-100 mt-8'>
          <FakeBrowser>
            <div
              className='flex-[1_0_0] bg-[radial-gradient(65.22%_99.35%_at_76.2%_118.78%,#D7E8F8_0%,#FFF_100%)] relative'
              style={{ aspectRatio: '5 / 3' }}
            >
              <WithReactTogetherProvider>
                <CheckboxTogether rtid='checkbox-test'/>
              </WithReactTogetherProvider>
            </div>
          </FakeBrowser>
          <FakeBrowser>
            <div
              className='flex-[1_0_0] bg-[radial-gradient(65.22%_99.35%_at_76.2%_118.78%,#F8F3D7_0%,#FFF_100%)] relative'
              style={{ aspectRatio: '5 / 3' }}
            >
              <WithReactTogetherProvider>
              <CheckboxTogether rtid='checkbox-test'/>
              </WithReactTogetherProvider>
            </div>
          </FakeBrowser>
        </div>

        <h4 id='installation'>Installation</h4>
        <CodeBlockExample />

        <h4 id='usage'>Usage</h4>
        <CodeBlock language='javascript' code1={`import { ${name} } from 'react-together'`} />
        <CodeBlock language='javascript' code1={`return <${name} rtid='unique-id' />`} />

        <h4 id='api'>API</h4>
    </>
  )
}

export const primeReactNavItems: NavItem[] = [
  { key: 'component-name', label: 'Component Name' },
  { key: 'installation', label: 'Installation' },
  { key: 'usage', label: 'Usage' },
  { key: 'api', label: 'API' },
]
