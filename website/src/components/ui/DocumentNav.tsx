import { PanelMenu } from 'primereact/panelmenu'
import { useNavigate } from 'react-router-dom'

export default function DocumentNav() {
  const navigate = useNavigate()

  const items = [
    {
      key: '0',
      label: 'Get Started',
      icon: 'pi pi-users',
      command: () => {
        navigate('/docs/get-started')
      },
      items: [
        {
          key: '0_1',
          label: 'Introduction',
          command: () => {
            navigate('/docs/get-started/introduction')
          },
        },
        {
          key: '0_2',
          label: 'Core Concept',
          command: () => {
            navigate('/docs/get-started/core-concept')
          },
        },
        {
          key: '0_3',
          label: 'Configuration',
          command: () => {
            navigate('/docs/get-started/configuration')
          },
        },
        {
          key: '0_4',
          label: 'Playground',
        },
      ],
    },
    {
      key: '1',
      label: 'Components',
      icon: 'pi pi-server',
      command: () => {
        navigate('/docs/components')
      },
      items: [
        {
          key: '1_0',
          label: 'Shared',
          command: () => {
            navigate('/docs/components/shared')
          },
        },
        {
          key: '1_1',
          label: 'Together',
          command: () => {
            navigate('/docs/components/together')
          },
        },
      ],
    },
    {
      key: '2',
      label: 'Guides',
      icon: 'pi pi-calendar',
      command: () => {
        navigate('/docs/guides')
      },
      items: [
        {
          key: '2_0',
          label: 'How-to',
          command: () => {
            navigate('/docs/guides/how-to')
          },
        },
        {
          key: '2_1',
          label: 'Troubleshooting',
          command: () => {
            navigate('/docs/guides/troubleshooting')
          },
        },
      ],
    },
    {
      key: '3',
      label: 'License',
      icon: 'pi pi-calendar',
      items: [
        {
          key: '3_0',
          label: 'License',
        },
        {
          key: '3_1',
          label: 'FAQ',
        },
      ],
    },
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
      <PanelMenu
        model={items}
        expandedKeys={expandedKeys}
        className='w-full md:w-80 [&_.p-panelmenu-header-link]:py-2 [&_.p-panelmenu-header-link]:pl-0 [&_.p-panelmenu-content_.p-menuitem-link]:pl-0 [&_.p-submenu-icon]:hidden'
      />
    </div>
  )
}
