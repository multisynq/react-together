import { CodeBlock } from '@components/ui'
import CodeSpan from '@components/ui/CodeSpan'
import Link from '@components/ui/Link'
import LinkSpan from '@components/ui/LinkSpan'
import DocumentationDemo from '@pages/Documentation/DocumentationDemo'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { NavItem } from './types'

const codes = {
  code_1: {
    basic: '$ npm i react-together',
  },

  code_2: {
    basic: `import { ReactTogether } from 'react-together'`,
  },

  code_3: {
    basic: `ReactDOM.createRoot(document.getElementById('root')!).render(
  <ReactTogether
    sessionParams={{
      appId: import.meta.env['VITE_APP_ID'],
      apiKey: import.meta.env['VITE_API_KEY']
    }}
  >
    <App />
  </ReactTogether>
)`,
  },

  code_4: {
    basic: `
const [count, set_count] = useStateTogether('count', 0)

return (
  <button 
    onClick={() => set_count((prev) => (prev === undefined ? 1 : prev + 1))}
    onContextMenu={(e) => { e.preventDefault(); set_count(0) }}
  >
    Count: {count}
  </button>
)`,

    typescript: `
import { useStateTogether } from './react-together'

export default function CountButtonTogether() {
  const [count, set_count] = useStateTogether('count', 0)

  return (
    <div className='flex flex-col align-items-center'>
      <button
        className='bg-slate-400 py-2 px-4 rounded-md text-white'
        onClick={() => set_count((prev) => (prev === undefined ? 1 : prev + 1))}
        onContextMenu={(e) => {
          e.preventDefault()
          set_count(0)
        }}
      >
        Count: {count}
      </button>
      <p style={{ color: '#888888', fontSize: '0.7rem' }}>Right click to reset to zero</p>
    </div>
  )
}`,
  },
}

export default function IntroductionPage() {
  const content = (
    <>
      <h2 id='getting-started'>Getting Started</h2>
      <p>In the future, websites are all live and connect visitors with each other all the time. That future is now!</p>
      <p>
        Welcome to ReactTogether! With this library you will be able to build synchronized web applications in the blink of an eye! No need
        to set up servers or sockets!
      </p>

      <h4 id='installation'>Installation</h4>
      <p>
        Install the <CodeSpan text='react-together' /> package via <CodeSpan text='npm' />
      </p>
      <CodeBlock code={codes.code_1} />

      <h4 id='context'>Context</h4>
      <p>
        Wrap your application inside the <LinkSpan text='<ReactTogether/>' to='/ReactTogether' /> component, and configure it using your
        Multisynq keys. The Multisynq keys are required to enable the synchronization magic that powers React Together. Get your keys at{' '}
        <Link to='https://multisynq.io/account' target='_blank'>
          multisynq.io/account
        </Link>
        .
      </p>
      <CodeBlock code={codes.code_2} />
      <CodeBlock code={codes.code_3} />

      <h4 id='sdf'>Use ReactTogether</h4>
      <p>That's it! Now you just need to import and use our components to create awesome interactive websites!</p>

      <h5>Example</h5>
      <DocumentationDemo url='CountButtonTogether' />
      <CodeBlock code={codes.code_4} />
    </>
  )

  return (
    <DocumentationPage
      {...{
        content,
        navItems: introductionNavItems,
      }}
    />
  )
}

export const introductionNavItems: NavItem[] = [
  { key: 'getting-started', label: 'Getting Started' },
  { key: 'installation', label: 'Installation' },
  { key: 'context', label: 'Context' },
]
