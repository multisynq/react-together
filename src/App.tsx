import {
  ConnectedViews,
  SharedCalendar,
  SharedCheckbox,
  SharedDropdown,
  SharedInputSwitch,
  SharedKnob,
  SharedMultiSelect,
  SharedRating,
  SharedSelectButton,
  SharedToggleButton,
  SharedTriStateCheckbox
} from '../react-together'
import { ReactTogetherManager } from '../react-together/components/ReactTogetherManager'
import SamplePage from './components/SamplePage'
import SharedCountButton from './components/SharedCountButton'
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
      <SharedCountButton />
      <ReactTogetherManager />
      {/* <PresenceDiv id="div"></PresenceDiv> */}
      <SharedCheckbox rtid="checkbox" />
      <SharedTriStateCheckbox rtid="tristate-checkbox" />
      <SharedDropdown
        rtid="dropdown"
        options={cities}
        optionLabel="name"
        placeholder="Select a City"
        className="w-full md:w-14rem"
      />
      <SharedRating rtid="shared-rating" tooltip="hello" />
      <SharedInputSwitch rtid="input-switch" />
      <SharedSelectButton
        rtid="select-button"
        options={items}
        optionLabel="name"
      />
      <SharedMultiSelect
        rtid="shared-multi-select"
        options={cities}
        optionLabel="name"
        multiple
        display="chip"
      />
      <SharedToggleButton rtid="toggle-button" />
      <SharedKnob rtid="knob" />
      <SharedCalendar
        rtid="color-picker"
        dateFormat="yy/mm/dd"
        disabledDays={[0, 1]}
        // inline
        invalid
      />
    </>
  )
}
