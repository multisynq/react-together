import { MenuItem } from 'primereact/menuitem'
import { PanelMenu } from 'primereact/panelmenu'
// import { useNavigate } from 'react-router-dom'

// Add `key` property to MenuItem and to its nested elements
export interface PatchedMenuItem extends MenuItem {
  key?: string
  items?: PatchedMenuItem[]
}

const items: PatchedMenuItem[] = [
  {
    label: 'Get Started',
    expanded: true,
    items: [{ label: 'Introduction' }, { label: 'Configuration' }],
  },
  {
    label: 'Components',
    expanded: true,
    items: [
      { label: 'ReactTogether', url: '/ReactTogether' },
      { label: 'ConnectedViews', url: '/ConnectedViews' },
      { label: 'PresenceDiv', url: '/PresenceDiv' },
      {
        label: 'Prime React',
        expanded: true,
        items: [
          { label: 'CalendarTogether', url: '/primereact/Calendar' },
          { label: 'CheckboxTogether', url: '/primereact/Checkbox' },
          { label: 'DropdownTogether', url: '/primereact/Dropdown' },
          { label: 'InputSwitchTogether', url: '/primereact/InputSwitch' },
          { label: 'KnobTogether', url: '/primereact/Knob' },
          { label: 'MultiSelectTogether', url: '/primereact/MultiSelect' },
          { label: 'RatingTogether', url: '/primereact/Rating' },
          { label: 'SelectButtonTogether', url: '/primereact/SelectButton' },
          { label: 'TabViewTogether', url: '/primereact/TabView' },
          { label: 'ToggleButtonTogether', url: '/primereact/ToggleButton' },
          { label: 'TriStateCheckboxTogether', url: '/primereact/TriStateCheckbox' },
        ],
      },
    ],
  },
  {
    label: 'Hooks',
    expanded: true,
    items: [
      { label: 'useStateTogether', url: '/useStateTogether' },
      { label: 'useStateTogetherWithPerUserValues', url: '/useStateTogetherWithPerUserValues' },
      { label: 'useConnectedViews', url: '/useConnectedViews' },
      { label: 'useHoveringViews', url: '/useHoveringViews' },
      { label: 'useIsTogether', url: '/useIsTogether' },
      { label: 'useConnectNewSession', url: '/useConnectNewSession' },
      { label: 'useLeaveSession', url: '/useLeaveSession' },
    ],
  },
  {
    // label: 'Discover',
    // expanded: true,
    // items: [
    //   { label: 'About Us', url: 'https://multisynq.io/' },
    //   { label: 'Roadmap' },
    //   { label: 'Support' },
    //   { label: 'Contributing' },
    //   { label: 'F.A.Q' },
    //   { label: 'License' },
    // ],
  },
]

function processMenuItems(items: PatchedMenuItem[], prefix: string | null = null) {
  let expandedKeys = {}
  items.forEach((i, idx) => {
    const key = prefix ? `${prefix}.${idx}` : `${idx}`
    i.key = key
    if (i.expanded && i.items) {
      expandedKeys[i.key] = true
      expandedKeys = { ...expandedKeys, ...processMenuItems(i.items, key) }
    }
  })
  return expandedKeys
}
const expandedKeys = processMenuItems(items)

export default function DocumentNav() {
  return (
    <PanelMenu
      model={items}
      expandedKeys={expandedKeys}
      // className='w-[160px] [&_.p-submenu-icon]:hidden'
      className='w-[180px]'
    />
  )
}
