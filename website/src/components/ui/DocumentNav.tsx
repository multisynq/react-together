import { PanelMenu } from 'primereact/panelmenu'
import { useNavigate } from 'react-router-dom'

export default function DocumentNav() {
  const navigate = useNavigate()

  const handleNavigation = (path) => {
    return () => navigate(path)
  }

  const createMenuItem = (key, label, path, subItems = []) => ({
    key,
    label,
    command: path ? handleNavigation(`/docs/${path}`) : undefined,
    items: subItems.map((sub) => createMenuItem(`${key}_${sub.key}`, sub.label, `${path}/${sub.path}`.toLowerCase().replace(/ /g, '-'))),
  })

  const items = [
    createMenuItem('0', 'Get Started', 'get-started', [
      { key: '0', label: 'Introduction', path: 'introduction' },
      { key: '1', label: 'Configuration', path: 'configuration' },
      // { key: '2', label: 'Core Concept', path: 'core-concept' },
      // { key: '3', label: 'Playground', path: 'playground' },
    ]),
    createMenuItem('1', 'Hooks', 'hooks', [
      { key: '0', label: 'Main Hooks', path: 'main-hooks' },
      { key: '1', label: 'Session Hooks', path: 'session-hooks' },
      // { key: '2', label: 'Utility Hooks', path: 'utility-hooks' },
    ]),
    createMenuItem('2', 'Components', 'components', [
      { key: '0', label: 'React Together', path: 'react-together' },
      { key: '1', label: 'Prime React', path: 'prime-react' },
      // { key: '2', label: 'Ant Design', path: 'ant-design' },
      // { key: '3', label: 'MUI', path: 'mui' },
      // { key: '4', label: 'Shadcn', path: 'shadcn' },
    ]),

    createMenuItem('3', 'Discover', 'discover', [
      { key: '0', label: 'About Us', path: 'about-us' },
      { key: '1', label: 'Roadmap', path: 'roadmap' },
      { key: '2', label: 'Source Code', path: 'source-code' },
      { key: '3', label: 'Change Code', path: 'change-code' },
      { key: '4', label: 'Support', path: 'support' },
    ]),
    createMenuItem('4', 'License', '', [
      { key: '0', label: 'License', path: 'license' },
      { key: '1', label: 'FAQ', path: 'faq' },
    ]),
  ]
  const expandedKeys = {}
  const expandNode = (node) => {
    if (node.items && node.items.length) {
      expandedKeys[node.key] = true
      node.items.forEach(expandNode)
    }
  }
  items.forEach(expandNode)

  return (
    <div className='w-[200px] h-full hidden sm:block'>
      <PanelMenu model={items} expandedKeys={expandedKeys} className='[&_.p-submenu-icon]:hidden' />
    </div>
  )
}
