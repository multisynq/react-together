import { CodeBlockExample } from '@components/ui/CodeBlockExample'
import DocumentDemoBox from '@components/ui/DocumentDemoBox'
import { NavItem } from './types'

export const RoadmapPage: React.FC = () => {
  return (
    <>
      <h2>Roadmap</h2>
      <h3 id='overview'>Overview</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
        ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <h4 id='useConnectNewSession'>useConnectNewSession</h4>
      <p>everyone sees the same state</p>
      <DocumentDemoBox />
      <CodeBlockExample />
      <h4 id='useIsTogether'>useIsTogether</h4>
      <p>everyone knows everyone else’s state</p>
      <DocumentDemoBox />
      <CodeBlockExample />
      <h4 id='useConnectedViews'>useConnectedViews</h4>
      <p>everyone knows everyone else’s state</p>
      <DocumentDemoBox />
      <CodeBlockExample />
    </>
  )
}

export const roadMapNavItems: NavItem[] = [
  { key: 'overview', label: 'Overview' },
  { key: 'useConnectNewSession', label: 'useConnectNewSession' },
  { key: 'useIsTogether', label: 'useIsTogether' },
  { key: 'useLeaveSession', label: 'useLeaveSession' },
]
