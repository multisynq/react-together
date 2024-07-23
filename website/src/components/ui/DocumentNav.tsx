import { MenuItem } from 'primereact/menuitem'
import { PanelMenu } from 'primereact/panelmenu'
// import { useNavigate } from 'react-router-dom'

// Add `key` property to MenuItem and to its nested elements
interface PatchedMenuItem extends MenuItem {
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
      { label: 'ConnectedViews' },
      { label: 'PresenceDiv' },
      {
        label: 'Prime React',
        items: [
          { label: 'CheckboxTogether' },
          { label: 'DropdownTogether' },
          { label: 'InputSwitchTogether' },
          { label: 'KnobTogether' },
          { label: 'MultiSelectTogether' },
          { label: 'RatingTogether' },
          { label: 'SelectButtonTogether' },
          { label: 'TabViewTogether' },
          { label: 'ToggleButtonTogether' },
          { label: 'TriStateCheckboxTogether' },
        ],
      },
    ],
  },
  {
    label: 'Hooks',
    expanded: true,
    items: [
      { label: 'useStateTogether' },
      { label: 'useStateTogetherWithPerUserValues' },
      { label: 'useIsTogether' },
      { label: 'useConnectNewSession' },
      { label: 'useLeaveSession' },
      { label: 'useConnectedUsers' },
      { label: 'useHoveringViews' },
    ],
  },
  {
    label: 'Discover',
    expanded: true,
    items: [
      { label: 'About Us' },
      { label: 'Roadmap' },
      { label: 'Support' },
      { label: 'Contributing' },
      { label: 'F.A.Q' },
      { label: 'License' },
    ],
  },
]

// This function adds a key to each element based on the item index in the tree
// and returns an object containing the keys of all the expanded objects
// https://primereact.org/panelmenu/
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
  // return <PanelMenu model={items} expandedKeys={expandedKeys} className='w-[160px] [&_.p-submenu-icon]:hidden' />
  return (
    <PanelMenu
      model={items}
      expandedKeys={expandedKeys}
      className='w-[160px] [&_.p-submenu-icon]:hidden'
      // value={{ unstyled: true, pt: {} }}
      unstyled={false}
    />
  )
}
