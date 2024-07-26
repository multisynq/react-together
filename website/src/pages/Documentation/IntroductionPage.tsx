import CountButtonTogether from '@components/demo/CountButtonTogether'
import { CodeBlock } from '@components/ui/CodeBlock'
import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/documentation/DocumentationPage'
import { Link } from 'react-router-dom'
import DocumentationDemo from './DocumentationDemo'
import { NavItem } from './types'

function IntroductionContent() {
  return (
    <>
      <h2 id='getting-started'>Getting Started</h2>
      <p>In the future, web sites are all live and connect visitors with each other all the time. That future is now!</p>
      <p>
        Welcome to React Together! With this library you will be able to build synchronized web applications in a blink of an eye! No need
        to set up servers or sockets!
      </p>
      <h4 id='installation'>Installation</h4>
      <p>Install the react-together package via npm</p>
      <CodeBlock language='bash' code1={`npm i react-together`} />
      <h4 id='context'>Context</h4>
      <p>
        Wrap your application inside the <LinkSpan text='<ReactTogether/>' to='/ReactTogether' /> component, and configure it using your
        Multisynq keys. You can get your <em>free</em> keys at <Link to='https://croquet.io/keys'>croquet.io/keys</Link>
      </p>
      <CodeBlock language='tsx' code1={`import { ReactTogether } from 'react-together'`} />
      <CodeBlock
        language='tsx'
        code1={`
ReactDOM.createRoot(document.getElementById('root')!).render(
  <ReactTogether
    sessionParams={{
      appId: import.meta.env['VITE_APP_ID'],
      apiKey: import.meta.env['VITE_API_KEY']
    }}
  >
    <App />
  </ReactTogether>
)`}
      />
      <h4 id='sdf'>Use ReactTogether</h4>
      That's it! Now you just need to import and use our components to create awesome interactive websites!
      <DocumentationDemo>
        <CountButtonTogether />
      </DocumentationDemo>
    </>
  )
}

const introductionNavItems: NavItem[] = [
  { key: 'getting-started', label: 'Getting Started' },
  { key: 'installation', label: 'Installation' },
  { key: 'context', label: 'Context' },
]

export default function IntroductionPage() {
  return <DocumentationPage content={<IntroductionContent />} navItems={introductionNavItems} />
}
