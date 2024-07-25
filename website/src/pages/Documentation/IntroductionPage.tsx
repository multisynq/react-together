import { CodeBlock } from '@components/ui/CodeBlock'
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

      <h3 id='context'>Context</h3>
      <p>Now, at a fairly top level of your React’s JSX, you will need to:</p>
      <p>Wrap everything in a ReactTogether tag so you can connect a (free) API key.</p>
      <CodeBlock language='javascript' code1={sampleCode2} />
    </>
  )
}

export default function IntroductionPage() {
  return <DocumentationSkeleton content={<IntroductionContent />} navItems={introductionNavItems} />
}
const introductionNavItems: NavItem[] = [
  { key: 'introduction', label: 'Introduction' },
  { key: 'installation', label: 'Installation' },
  { key: 'context', label: 'Context' },
]
