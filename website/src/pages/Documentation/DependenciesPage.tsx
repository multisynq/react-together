import Link from '@components/ui/Link'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { NavItem } from './types'

function DependenciesContent() {
  return (
    <>
      <h2>React Together's Dependencies</h2>
      <p>ReactTogether makes use of some amazing technology under the hood.</p>
      <ul>
        <li>
          <div>
            <h4 id='Multisynq-React'>
              <Link target='_blank' to='https://multisynq.io/docs/multisynq-react/'>
                Multisynq React
              </Link>
            </h4>
            <p className='pl-4 pt-2'>
              A lower-level library that helps wire ReactTogether to Multisynq. You might use this if you are making something fundamentally
              novel.
            </p>
          </div>
        </li>
        <li>
          <div>
            <h4 id='Multisynq'>
              <Link target='_blank' to='https://multisynq.io/docs/client/'>
                Multisynq
              </Link>
            </h4>
            <p className='pl-4 pt-2'>The futuristic networking system that makes it all possible and so easy. There is magic here.</p>
          </div>
        </li>
      </ul>
    </>
  )
}
const dependenciesNavItems: NavItem[] = [
  { key: 'Multisynq-React', label: 'Multisynq React' },
  { key: 'Multisynq', label: 'Multisynq' },
]

export default function DependenciesPage() {
  return <DocumentationPage content={<DependenciesContent />} navItems={dependenciesNavItems} />
}
