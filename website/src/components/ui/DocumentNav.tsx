import { PanelMenu } from 'primereact/panelmenu'

export default function DocumentNav() {
  const items = [
    {
      key: '0',
      label: 'Get Started',
      icon: 'pi pi-users',
      items: [
        {
          key: '0_1',
          label: 'Introduction',
        },
        {
          key: '0_2',
          label: 'Core Concept',
        },
        {
          key: '0_3',
          label: 'Configuration',
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
      items: [
        {
          key: '1_0',
          label: 'Shared',
        },
        {
          key: '1_1',
          label: 'Together',
        },
      ],
    },
    {
      key: '2',
      label: 'Guides',
      icon: 'pi pi-calendar',
      items: [
        {
          key: '2_0',
          label: 'How-to',
        },
        {
          key: '2_1',
          label: 'Troubleshooting',
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
    <div className='card flex flex-column align-items-center gap-3'>
      <PanelMenu model={items} expandedKeys={expandedKeys} />
    </div>
  )
}
