import {
  CalendarTogether,
  CheckboxTogether,
  ConnectedViews,
  DropdownTogether,
  InputSwitchTogether,
  KnobTogether,
  MultiSelectTogether,
  RatingTogether,
  SelectButtonTogether,
  ToggleButtonTogether,
  TriStateCheckboxTogether
} from '../react-together'
import { ReactTogetherManager } from '../react-together/components/ReactTogetherManager'
import CountButtonTogether from './components/CountButtonTogether'
import SamplePage from './components/SamplePage'
import SyncedTabs from './components/SyncedTabs'

export default function App() {
  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
  ]
  const items = [
    { name: 'Option 1', value: 1 },
    { name: 'Option 2', value: 2 },
    { name: 'Option 3', value: 3, disabled: false }
  ]

  return (
    <>
      <ConnectedViews maxAvatars={2} />
      <SamplePage />
      {/* <PresenceDiv id="presence-div"></PresenceDiv> */}
      <SyncedTabs />
      <CountButtonTogether />
      <ReactTogetherManager />
      {/* <PresenceDiv id="div"></PresenceDiv> */}
      <CheckboxTogether rtid="checkbox" />
      <TriStateCheckboxTogether rtid="tristate-checkbox" />
      <DropdownTogether
        rtid="dropdown"
        options={cities}
        optionLabel="name"
        placeholder="Select a City"
        className="w-full md:w-14rem"
      />
      <RatingTogether rtid="rating" tooltip="hello" />
      <InputSwitchTogether rtid="input-switch" />
      <SelectButtonTogether
        rtid="select-button"
        options={items}
        optionLabel="name"
      />
      <MultiSelectTogether
        rtid="multi-select"
        options={cities}
        optionLabel="name"
        multiple
        display="chip"
      />
      <ToggleButtonTogether rtid="toggle-button" />
      <KnobTogether rtid="knob" />
      <CalendarTogether
        rtid="calendar"
        dateFormat="yy/mm/dd"
        disabledDays={[0, 1]}
        // inline
        invalid
      />
    </>
  )
}
