import { PanelMenu } from 'primereact/panelmenu'

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
    <div className='hidden md:block md:w-[200px] sticky top-20'>
      <PanelMenu
        model={navItems}
        expandedKeys={expandedKeys}
        className='w-full [&_.p-panelmenu-header-link]:py-2 [&_.p-panelmenu-header-link]:pl-0 [&_.p-panelmenu-content_.p-menuitem-link]:pl-0 [&_.p-submenu-icon]:hidden'
      />
    </div>
  )
}
