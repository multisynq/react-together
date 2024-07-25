import { PanelMenu } from 'primereact/panelmenu'
import { classNames } from 'primereact/utils'
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
      <PanelMenu
        model={navItems}
        expandedKeys={expandedKeys}
        pt={{
          root: classNames('w-[150px] lg:w-[200px]'),
          panel: classNames('w-full bg-white rounded-xl border-2 border-gray-200 overflow-hidden shadow-lineStyleLight'),
          headerAction: classNames('pt-4 pb-2'),
          headerContent: classNames('border-0 bg-transparent'),
          headerLabel: classNames('text-gray-900'),
          headerSubmenuIcon: classNames('hidden'),
          menuContent: classNames('py-0 border-0 rounded-none'),
          label: classNames('text-gray-800 text-sm lg:text-base'),
          action: classNames('pl-8 py-2'),
        }}
      />
    </div>
  )
}
