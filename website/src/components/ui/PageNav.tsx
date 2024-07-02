import { PanelMenu } from 'primereact/panelmenu'
import React from 'react'

export default function DocumentationNav() {
  const items = [
    {
      key: '0',
      label: 'On This Page',
      icon: 'pi pi-users',
      items: [
        {
          key: '0_1',
          label: 'Installation',
        },
        {
          key: '0_2',
          label: 'Download',
        },
        {
          key: '0_3',
          label: 'Context',
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
      <PanelMenu model={items} expandedKeys={expandedKeys} className='w-full md:w-20rem' />
    </div>
  )
}
