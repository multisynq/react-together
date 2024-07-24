import { CodeBlock } from '@components/ui/CodeBlock'
import { TableContainer } from '@components/ui/TableContainer'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
import { NavItem } from './types'

function IntroductionContent() {
  const sampleCode1 = `npm i react-together`
  const sampleCode2 = `ReactDOM.createRoot(document.getElementById('root')!).render(
       <ReactTogether
         sessionParams={{
           appId: import.meta.env['VITE_APP_ID'],
           apiKey: import.meta.env['VITE_API_KEY']
         }}
       >
         <App />
       </ReactTogether>
)
`
  const keys = [
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'type',
      label: 'Type',
    },
    {
      key: 'default',
      label: 'Default Value',
    },
    {
      key: 'description',
      label: 'Description',
    },
  ]
  const data = [
    {
      name: 'Test',
      type: 'String',
      default: '0',
      description: 'A short description',
    },
    {
      name: 'Test2',
      default: '0',
      description: 'A short description',
    },
    {
      name: 'Test2',
      default: '0',
    },
  ]
  return (
    <>
      <h3 id='introduction'>Introduction</h3>
      <p>In the future, web sites are all live and connect visitors with each other all the time. That future is now!</p>
      <p>
        Welcome to React Together! With this library you will be able to build synchronized web applications in a blink of an eye! No need
        to set up servers or sockets!
      </p>
      <h3 id='installation'>Installation</h3>
      <p>In your shiny React project, you will need to install the react-together package.</p>
      <CodeBlock language='javascript' code1={sampleCode1} />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt
        in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <h3 id='context'>Context</h3>
      <p>Now, at a fairly top level of your React’s JSX, you will need to:</p>
      <p>Wrap everything in a ReactTogether tag so you can connect a (free) API key.</p>
      <CodeBlock language='javascript' code1={sampleCode2} />
      <TableContainer keys={keys} data={data} />
    </>
  )
}

export default function IntroductionPage() {
  return <DocumentationSkeleton content={<IntroductionContent />} keyToLookupWith='' navItems={introductionNavItems} />
}
const introductionNavItems: NavItem[] = [
  { key: 'introduction', label: 'Introduction' },
  { key: 'installation', label: 'Installation' },
  { key: 'context', label: 'Context' },
]
