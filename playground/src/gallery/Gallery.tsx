import { ConnectedViews } from 'react-together'
import {
  CalendarTogether,
  CheckboxTogether,
  DropdownTogether,
  InputSwitchTogether,
  KnobTogether,
  MultiSelectTogether,
  RatingTogether,
  SelectButtonTogether,
  ToggleButtonTogether,
  TriStateCheckboxTogether
} from 'react-together-primereact'
// import { ReactTogetherManager } from 'react-together/src/components/ReactTogetherManager'
import CountButtonTogether from './components/CountButtonTogether'
import NestedPresenceDivs from './components/NestedPresenceDivs'
import SamplePage from './components/SamplePage'
import SyncedTabs from './components/SyncedTabs'

export default function Gallery() {
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
    <div className="flex flex-col gap-2 items-center">
      <ConnectedViews maxAvatars={5} />
      <SamplePage />
      {/* <PresenceDiv rtKey="presence-div"></PresenceDiv> */}
      <SyncedTabs />
      <div className="flex gap-2 items-center">
        <CountButtonTogether />
        <CheckboxTogether rtKey="checkbox" />
        <TriStateCheckboxTogether rtKey="tristate-checkbox" />
        <InputSwitchTogether rtKey="input-switch" />
        <RatingTogether rtKey="rating" />
      </div>
      <div className="flex gap-2 items-center">
        <DropdownTogether
          rtKey="dropdown"
          options={cities}
          optionLabel="name"
          placeholder="Select a City"
          className="w-full md:w-14rem"
        />

        <MultiSelectTogether
          rtKey="multi-select"
          options={cities}
          optionLabel="name"
          multiple
          display="chip"
        />
      </div>
      <div className="flex gap-2 items-center">
        <SelectButtonTogether
          rtKey="select-button"
          options={items}
          optionLabel="name"
        />
        <ToggleButtonTogether rtKey="toggle-button" />
      </div>
      <div className="flex gap-2 items-center">
        {/* <PresenceDiv rtKey="div"></PresenceDiv> */}
        <KnobTogether rtKey="knob" />
        <CalendarTogether
          rtKey="calendar"
          dateFormat="yy/mm/dd"
          disabledDays={[0, 1]}
          // inline
          invalid
        />
      </div>
      <NestedPresenceDivs />
    </div>
  )
}
