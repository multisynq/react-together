import { NavItem } from './types'
import { CodeBlockExample } from '@components/ui/CodeBlockExample'
import DocumentDemoBox from '@components/ui/DocumentDemoBox'

export const MainHooksComponent: React.FC = () => {
  return (
    <>
      <h2>Main Hooks</h2>
      <h3 id='overview'>Overview</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <h4 id='useSharedState'>useSharedState</h4>
      <p>everyone sees the same state</p>
      <DocumentDemoBox />
      <CodeBlockExample />
      <h4 id='useStateTogether'>useStateTogether</h4>
      <p>everyone knows everyone else’s state</p>
      <DocumentDemoBox />
      <CodeBlockExample />
    </>
  )
}

export const mainHooksNavItems: NavItem[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'useSharedState', label: 'useSharedState' },
  { key: 'useStateTogether', label: 'useStateTogether' },
]
