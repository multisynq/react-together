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

const baseUrl = 'ReactTogether#'

const items: PatchedMenuItem[] = [
  {
    label: 'Getting Started',
    url: `${baseUrl}/getting-started`,
  },
  {
    label: 'Components',
    expanded: true,
    items: [
      { label: 'ReactTogether', url: `${baseUrl}/ReactTogether` },
      { label: 'ConnectedViews', url: `${baseUrl}ReactTogether#ConnectedViews` },
      { label: 'PresenceDiv', url: `${baseUrl}/PresenceDiv` },
      {
        label: 'Prime React',
        expanded: true,
        items: [
          // { label: 'CalendarTogether', url: '/primereact/Calendar' },
          { label: 'CheckboxTogether', url: `${baseUrl}/primereact/Checkbox` },
          { label: 'ColorPickerTogether', url: `${baseUrl}/primereact/ColorPicker` },
          { label: 'DropdownTogether', url: `/primereact/Dropdown` },
          { label: 'InputSwitchTogether', url: `${baseUrl}/primereact/InputSwitch` },
          { label: 'KnobTogether', url: `${baseUrl}/primereact/Knob` },
          { label: 'MultiSelectTogether', url: `${baseUrl}/primereact/MultiSelect` },
          { label: 'RatingTogether', url: `${baseUrl}/primereact/Rating` },
          { label: 'SelectButtonTogether', url: `${baseUrl}/primereact/SelectButton` },
          { label: 'TabViewTogether', url: `${baseUrl}/primereact/TabView` },
          { label: 'ToggleButtonTogether', url: `${baseUrl}/primereact/ToggleButton` },
          { label: 'TriStateCheckboxTogether', url: `${baseUrl}/primereact/TriStateCheckbox` },
        ],
      },
    ],
  },
  {
    label: 'Hooks',
    expanded: true,
    items: [
      { label: 'useStateTogether', url: `${baseUrl}/useStateTogether` },
      { label: 'useStateTogetherWithPerUserValues', url: `${baseUrl}/useStateTogetherWithPerUserValues` },
      { label: 'useConnectedViews', url: `${baseUrl}/useConnectedViews` },
      { label: 'useHoveringViews', url: `${baseUrl}/useHoveringViews` },
      // { label: 'useIsTogether', to: '/useIsTogether' },
      // { label: 'useConnectNewSession', to: '/useConnectNewSession' },
      // { label: 'useLeaveSession', to: '/useLeaveSession' },
    ],
  },
  {
    label: 'Discovery',
    expanded: true,
    items: [
      { label: 'Contributing', url: `${baseUrl}/contributing` },
      { label: 'Pricing', url: `${baseUrl}/pricing` },
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
        root: classNames('sm:line-border overflow-hidden bg-white w-[300px] sm:w-[170px] md:w-[220px]'),
        headerContent: classNames('border-0 bg-transparent'),
        headerAction: classNames('pt-4 pb-3'),
        panel: classNames('border-0'),
        headerLabel: classNames('text-gray-900'),
        headerSubmenuIcon: classNames('hidden'),
        menuContent: classNames('py-0 border-0 rounded-none bg-transparent'),
        action: classNames('pl-6 py-2'),
        label: classNames('text-gray-800 text-xs md:text-sm break-all'),
        content: classNames('rounded-md'),
      }}
    />
  )
}
