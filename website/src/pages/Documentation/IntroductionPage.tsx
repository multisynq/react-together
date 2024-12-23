import { CodeBlock, CodeSpan, Link, LinkSpan } from '@components/ui'
import DocumentationDemo from '@pages/Documentation/DocumentationDemo'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import getDocLinks from '@utils/getDocLinks'
import { TabPanel, TabView } from 'primereact/tabview'
import { NavItem } from './types'

const codes = {
  install: {
    basic: '$ npm i react-together',
  },

  import: {
    basic: `import { ReactTogether } from 'react-together'`,
  },

  createRoot: {
    basic: `
ReactDOM.createRoot(document.getElementById('root')!).render(
  <ReactTogether
    sessionParams={{
      appId: import.meta.env['VITE_APP_ID'],
      apiKey: import.meta.env['VITE_API_KEY'],

      // The options below will make every user immediately join session 'hello-world'
      name: 'hello-world',
      password: 'super-secret!!',
    }}
  >
    <App />
  </ReactTogether>
)
`,
  },

  usage_1: {
    basic: `
function YourComponent() {
  const [count, set_count] = useStateTogether('count', 0)

  return (
    <button 
      onClick={() => set_count((prev) => (prev === undefined ? 1 : prev + 1))}
      onContextMenu={(e) => { e.preventDefault(); set_count(0) }}
    >
      Count: {count}
    </button>
  )
}
`,
  },

  usage_2: {
    basic: `
import { useStateTogether } from './react-together'

export default function CountButtonTogether() {
  const [count, set_count] = useStateTogether('count', 0)

  return (
    <div className='flex flex-col align-items-center'>
      <button
        className='bg-gray-400 py-2 px-4 rounded-md text-white'
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
}
`,
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
      <CodeBlock code={codes.install} />

      <h4 id='context'>Context</h4>
      <p>
        Wrap your application inside the <LinkSpan text='<ReactTogether/>' to='/ReactTogether' /> component, and configure it using your
        Multisynq keys. The Multisynq keys are required to enable the synchronization magic that powers React Together. Get your keys at{' '}
        <Link to='https://multisynq.io/account' target='_blank'>
          multisynq.io/account
        </Link>
        .
      </p>
      <CodeBlock code={codes.import} />
      <CodeBlock code={codes.createRoot} />

      <h4 id='sdf'>Use ReactTogether</h4>
      <p>That's it! Now you just need to import and use our components to create awesome interactive websites!</p>

      <CodeBlock code={codes.usage_1} />

      <h5>Example</h5>
      <TabView className='w-full'>
        <TabPanel header='Preview'>
          <DocumentationDemo url='CountButtonTogether' />
        </TabPanel>
        <TabPanel header='Code'>
          <CodeBlock {...{ code: codes.usage_2, github: getDocLinks({ rt_path: 'CountButtonTogether.tsx' }).github_demo }} />
        </TabPanel>
      </TabView>
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
