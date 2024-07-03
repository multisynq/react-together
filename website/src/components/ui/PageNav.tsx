import { PanelMenu } from 'primereact/panelmenu'
import React from 'react'

export default function DocumentationNav() {
  const items = [
    {
      key: '0',
      label: 'On This Page',
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
    <div className='hidden md:flex flex-col items-start h-full'>
      <PanelMenu
        model={items}
        expandedKeys={expandedKeys}
        className='w-full [&_.p-panelmenu-header-link]:py-2 [&_.p-panelmenu-header-link]:pl-0 [&_.p-panelmenu-content_.p-menuitem-link]:pl-0 [&_.p-submenu-icon]:hidden'
      />
    </div>
  )
}
