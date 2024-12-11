import { useLocalStorage } from '@uidotdev/usehooks'
import { MenuItem, MenuItemCommandEvent } from 'primereact/menuitem'
import { PanelMenu } from 'primereact/panelmenu'
import { classNames } from 'primereact/utils'

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

const baseUrl = ''

const items: PatchedMenuItem[] = [
  {
    key: 'Introduction',
    label: 'Introduction',
    // url: `${baseUrl}/getting-started`,
    items: [
      { key: 'Getting Started', label: 'Getting Started', url: `${baseUrl}/Getting-Started` },
      { key: 'Dependencies', label: 'Dependencies', url: `${baseUrl}/Dependencies` },
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
      { key: 'use-function-together', label: 'useFunctionTogether', url: `${baseUrl}/useFunctionTogether` },
      {
        key: 'useful-hooks',
        label: 'Other useful hooks',
        items: [
          { key: 'use-connected-users', label: 'useConnectedUsers', url: `${baseUrl}/useConnectedUsers` },
          { key: 'use-hovering-views', label: 'useHoveringUsers', url: `${baseUrl}/useHoveringUsers` },
          { key: 'use-create-session', label: 'useCreateRandomSession', url: `${baseUrl}/useCreateRandomSession` },
          { key: 'use-is-together', label: 'useIsTogether', url: `${baseUrl}/useIsTogether` },
          { key: 'use-leave-session', label: 'useLeaveSession', url: `${baseUrl}/useLeaveSession` },
          { key: 'use-join-url', label: 'useJoinUrl', url: `${baseUrl}/useJoinUrl` },
          { key: 'use-my-id', label: 'useMyId', url: `${baseUrl}/useMyId` },
        ],
      },
    ],
  },
  {
    key: 'components',
    label: 'Components',
    items: [
      { key: 'react-together', label: 'ReactTogether', url: `${baseUrl}/ReactTogether` },
      { key: 'react-together-mgr', label: 'SessionManager', url: `${baseUrl}/SessionManager` },
      { key: 'connected-views', label: 'ConnectedUsers', url: `${baseUrl}/ConnectedUsers` },
      { key: 'hover-highlighter', label: 'HoverHighlighter', url: `${baseUrl}/HoverHighlighter` },
      {
        key: 'antdesign',
        label: 'Ant Design',
        items: [
          { key: 'checkbox-together', label: 'CheckboxTogether', url: `${baseUrl}/antdesign/Checkbox` },
          // { key: 'date-picker-together', label: 'DatePickerTogether', url: `${baseUrl}/antdesign/DatePicker` },
          { key: 'multi-select-together', label: 'MultiSelectTogether', url: `${baseUrl}/antdesign/MultiSelect` },
          { key: 'rate-together', label: 'RateTogether', url: `${baseUrl}/antdesign/Rate` },
          { key: 'select-button-together', label: 'SelectButtonTogether', url: `${baseUrl}/antdesign/SelectButton` },
          { key: 'select-together', label: 'SelectTogether', url: `${baseUrl}/antdesign/Select` },
          { key: 'slider-together', label: 'SliderTogether', url: `${baseUrl}/antdesign/Slider` },
          { key: 'switch-together', label: 'SwitchTogether', url: `${baseUrl}/antdesign/Switch` },
          { key: 'toggle-button-together', label: 'ToggleButtonTogether', url: `${baseUrl}/antdesign/ToggleButton` },
        ],
      },
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
    key: 'advanced',
    label: 'Advanced usage',
    items: [
      {
        key: 'croquet',
        label: 'Croquet',
        url: `${baseUrl}/croquet`,
      },
      {
        key: 'utils',
        label: 'Utils module',
        url: `${baseUrl}/utils`,
      },
    ],
  },
  {
    key: 'discover',
    label: 'Discover',
    items: [
      { key: 'contributing', label: 'Contributing', url: `${baseUrl}/contributing` },
      { key: 'pricing', label: 'Pricing', url: `${baseUrl}/pricing` },
      { key: 'changelog', label: 'Change Log', url: `${baseUrl}/changelog` },
    ],
  },
]

const flattenKeys = (nodes, keys = {}) => {
  nodes.forEach((node) => {
    keys[node.key] = true
    if (node.items) {
      flattenKeys(node.items, keys)
    }
  })
  return keys
}

export default function DocumentNav() {
  const [expandedKeys, setExpandedKeys] = useLocalStorage('document-nav-expanded', flattenKeys(items))

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
