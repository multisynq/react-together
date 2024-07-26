import { MenuItem, MenuItemCommandEvent } from 'primereact/menuitem'
import { PanelMenu } from 'primereact/panelmenu'
import { classNames } from 'primereact/utils'
import { useNavigate } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom'

// Add `key` and `to` properties to MenuItem and to its nested elements
export interface PatchedMenuItem extends MenuItem {
  key?: string
  items?: PatchedMenuItem[]
  to?: string
  command?: (e: PatchedMenuItemCommandEvent) => void
}
interface PatchedMenuItemCommandEvent extends MenuItemCommandEvent {
  item: PatchedMenuItem
}

const items: PatchedMenuItem[] = [
  {
    label: 'Get Started',
    expanded: true,
    items: [
      { label: 'Introduction', to: '/introduction' },
      { label: 'Installation', to: '/installation' },
    ],
  },
  {
    label: 'Components',
    expanded: true,
    items: [
      { label: 'ReactTogether', to: '/ReactTogether' },
      { label: 'ConnectedViews', to: '/ConnectedViews' },
      { label: 'PresenceDiv', to: '/PresenceDiv' },
      {
        label: 'Prime React',
        expanded: true,
        items: [
          // { label: 'CalendarTogether', to: '/primereact/Calendar' },
          { label: 'CheckboxTogether', to: '/primereact/Checkbox' },
          { label: 'DropdownTogether', to: '/primereact/Dropdown' },
          { label: 'InputSwitchTogether', to: '/primereact/InputSwitch' },
          { label: 'KnobTogether', to: '/primereact/Knob' },
          { label: 'MultiSelectTogether', to: '/primereact/MultiSelect' },
          { label: 'RatingTogether', to: '/primereact/Rating' },
          { label: 'SelectButtonTogether', to: '/primereact/SelectButton' },
          { label: 'TabViewTogether', to: '/primereact/TabView' },
          { label: 'ToggleButtonTogether', to: '/primereact/ToggleButton' },
          { label: 'TriStateCheckboxTogether', to: '/primereact/TriStateCheckbox' },
        ],
      },
    ],
  },
  {
    label: 'Hooks',
    expanded: true,
    items: [
      { label: 'useStateTogether', to: '/useStateTogether' },
      { label: 'useStateTogetherWithPerUserValues', to: '/useStateTogetherWithPerUserValues' },
      { label: 'useConnectedViews', to: '/useConnectedViews' },
      { label: 'useHoveringViews', to: '/useHoveringViews' },
      { label: 'useIsTogether', to: '/useIsTogether' },
      { label: 'useConnectNewSession', to: '/useConnectNewSession' },
      { label: 'useLeaveSession', to: '/useLeaveSession' },
    ],
  },
  // {
  //   label: 'Discover',
  //   expanded: true,
  //   items: [
  //     { label: 'About Us', to: 'https://multisynq.io/' },
  //     { label: 'Roadmap' },
  //     { label: 'Support' },
  //     { label: 'Contributing' },
  //     { label: 'F.A.Q' },
  //     { label: 'License' },
  //   ],
  // },
]

export default function DocumentNav() {
  const navigate = useNavigate()

  // We have to process the items inside the component body because
  // we need to use the navigate hook.
  // This has room to be improved
  function processMenuItems(items: PatchedMenuItem[], prefix: string | null = null) {
    let expandedKeys = {}
    items.forEach((i, idx) => {
      const key = prefix ? `${prefix}.${idx}` : `${idx}`
      i.command = ({ item }) => {
        if (item.to) {
          navigate(item.to)
        }
      }

      if (i.expanded && i.items) {
        expandedKeys[i.key] = true
        expandedKeys = { ...expandedKeys, ...processMenuItems(i.items, key) }
      }
    })
    return expandedKeys
  }
  const expandedKeys = processMenuItems(items)
  return (
    <PanelMenu
      model={items}
      expandedKeys={expandedKeys}
      pt={{
        root: classNames('border-2 border-gray-700 rounded-xl overflow-hidden shadow-lineStyleDark bg-white w-[180px] lg:w-[220px]'),
        headerContent: classNames('border-0 bg-transparent'),
        headerAction: classNames('pt-4 pb-3 rounded-xl bg-white bro'),
        panel: classNames('border-0'),
        headerLabel: classNames('text-gray-900'),
        headerSubmenuIcon: classNames('hidden'),
        menuContent: classNames('py-0 border-0 rounded-none bg-transparent'),
        action: classNames('pl-8 py-2'),
        label: classNames('text-gray-800 text-sm lg:text-base'),
        content: classNames('rounded-md'),
        // submenuIcon: classNames('pi pi-file'),
      }}
    />
  )
}
