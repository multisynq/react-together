import { PanelMenu } from 'primereact/panelmenu'
import { PatchedMenuItem } from './DocumentNav'

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

interface PageNavProps {
  items: PatchedMenuItem[]
}
export default function PageNav({ items }: PageNavProps) {
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
      <PanelMenu model={navItems} expandedKeys={expandedKeys} className='w-[160px] [&_.p-submenu-icon]:hidden' />
    </div>
  )
}
