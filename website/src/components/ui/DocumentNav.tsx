import { MenuItem, MenuItemCommandEvent } from 'primereact/menuitem'
import { PanelMenu } from 'primereact/panelmenu'
import { classNames } from 'primereact/utils'
import { useEffect, useState } from 'react'

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

const baseUrl = '#'

const items: PatchedMenuItem[] = [
  {
    key: 'getting-started',
    label: 'Getting Started',
    url: `${baseUrl}/getting-started`,
  },
  {
    key: 'components',
    label: 'Components',
    items: [
      { key: 'react-together', label: 'ReactTogether', url: `${baseUrl}/ReactTogether` },
      { key: 'connected-views', label: 'ConnectedViews', url: `${baseUrl}/ConnectedViews` },
      { key: 'presence-div', label: 'PresenceDiv', url: `${baseUrl}/PresenceDiv` },
      {
        key: 'prime-react',
        label: 'Prime React',
        items: [
          { key: 'checkbox-together', label: 'CheckboxTogether', url: `${baseUrl}/primereact/Checkbox` },
          { key: 'color-picker-together', label: 'ColorPickerTogether', url: `${baseUrl}/primereact/ColorPicker` },
          { key: 'dropdown-together', label: 'DropdownTogether', url: `${baseUrl}/primereact/Dropdown` },
          { key: 'input-switch-together', label: 'InputSwitchTogether', url: `${baseUrl}/primereact/InputSwitch` },
          { key: 'knob-together', label: 'KnobTogether', url: `${baseUrl}/primereact/Knob` },
          { key: 'multi-select-together', label: 'MultiSelectTogether', url: `${baseUrl}/primereact/MultiSelect` },
          { key: 'rating-together', label: 'RatingTogether', url: `${baseUrl}/primereact/Rating` },
          { key: 'select-button-together', label: 'SelectButtonTogether', url: `${baseUrl}/primereact/SelectButton` },
          { key: 'tab-view-together', label: 'TabViewTogether', url: `${baseUrl}/primereact/TabView` },
          { key: 'toggle-button-together', label: 'ToggleButtonTogether', url: `${baseUrl}/primereact/ToggleButton` },
          { key: 'tri-state-checkbox-together', label: 'TriStateCheckboxTogether', url: `${baseUrl}/primereact/TriStateCheckbox` },
        ],
      },
    ],
  },
  {
    key: 'hooks',
    label: 'Hooks',
    items: [
      { key: 'use-state-together', label: 'useStateTogether', url: `${baseUrl}/useStateTogether` },
      {
        key: 'use-state-together-with-per-user-values',
        label: 'useStateTogetherWithPerUserValues',
        url: `${baseUrl}/useStateTogetherWithPerUserValues`,
      },
      { key: 'use-connected-views', label: 'useConnectedViews', url: `${baseUrl}/useConnectedViews` },
      { key: 'use-hovering-views', label: 'useHoveringViews', url: `${baseUrl}/useHoveringViews` },
    ],
  },
  {
    key: 'discover',
    label: 'Discover',
    items: [
      { key: 'contributing', label: 'Contributing', url: `${baseUrl}/contributing` },
      { key: 'pricing', label: 'Pricing', url: `${baseUrl}/pricing` },
    ],
  },
]

export default function DocumentNav() {
  const [expandedKeys, setExpandedKeys] = useState({})

  useEffect(() => {
    const flattenKeys = (nodes, keys = {}) => {
      nodes.forEach((node) => {
        keys[node.key] = true
        if (node.items) {
          flattenKeys(node.items, keys)
        }
      })
      return keys
    }

    setExpandedKeys(flattenKeys(items))
  }, [])

  return (
    <PanelMenu
      model={items}
      expandedKeys={expandedKeys}
      onExpandedKeysChange={setExpandedKeys}
      className='w-full md:w-20rem'
      pt={{
        root: classNames('sm:line-border overflow-hidden bg-white w-[200px] md:w-[240px]'),
        headerContent: classNames('border-0 bg-transparent'),
        headerAction: classNames('pt-4 pb-3'),
        panel: classNames('border-0'),
        headerLabel: classNames('text-gray-900'),
        menuContent: classNames('py-0 border-0 rounded-none bg-transparent'),
        action: classNames('py-2'),
        label: classNames('text-gray-800 text-xs md:text-sm break-all'),
        content: classNames('rounded-md'),
      }}
      multiple
    />
  )
}
