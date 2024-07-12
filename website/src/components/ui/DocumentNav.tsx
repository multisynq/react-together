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
      { key: '1', label: 'Introduction', path: 'introduction' },
      { key: '2', label: 'Core Concept', path: 'core-concept' },
      { key: '3', label: 'Configuration', path: 'configuration' },
      { key: '4', label: 'Playground', path: 'playground' },
    ]),
    createMenuItem('1', 'Components', 'components', [
      { key: '0', label: 'Hooks', path: 'hooks' },
      { key: '1', label: 'Together', path: 'together' },
    ]),
    createMenuItem('2', 'Guides', 'guides', [
      { key: '0', label: 'How-to', path: 'how-to' },
      { key: '1', label: 'Troubleshooting', path: 'troubleshooting' },
    ]),
    createMenuItem('3', 'License', '', [
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
    <div className='w-[200px] h-full'>
      <PanelMenu model={items} expandedKeys={expandedKeys} className='[&_.p-submenu-icon]:hidden' />
    </div>
  )
}
