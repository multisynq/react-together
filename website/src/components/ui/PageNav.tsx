import { PanelMenu } from 'primereact/panelmenu'
import React from 'react'

function scrollToElement(id) {
  const element = document.getElementById(id)
  if (element) {
    const offset = 80 // Adjust this value as needed
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }
}

export default function PageNav({ items }) {
  const navItems = [
    {
      key: '0',
      label: 'On This Page',
      items: items.map((item) => ({
        ...item,
        command: () => scrollToElement(item.key),
      })),
    },
  ]

  const expandedKeys = { '0': true }

  return (
    <div className='hidden md:flex md:w-[200px] flex-col items-start h-full'>
      <PanelMenu
        model={navItems}
        expandedKeys={expandedKeys}
        className='w-full [&_.p-panelmenu-header-link]:py-2 [&_.p-panelmenu-header-link]:pl-0 [&_.p-panelmenu-content_.p-menuitem-link]:pl-0 [&_.p-submenu-icon]:hidden'
      />
    </div>
  )
}
