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
    <div className='hidden md:flex w-48 flex-col items-start h-full'>
      <PanelMenu model={items} expandedKeys={expandedKeys} className='w-full md:w-20rem' />
    </div>
  )
}
