import SharedCountButton from "@components/demo/SharedCountButton";
import SyncedTabs from "@components/demo/SyncedTabs";
import { FakeBrowser } from "@components/ui/FakeBrowser";
import { 
  ConnectedViews, 
  PresenceDiv, 
  ReactTogether, 
  SharedCalendar, 
  SharedCheckbox, 
  SharedDropdown, 
  SharedInputSwitch, 
  SharedKnob, 
  SharedMultiSelect, 
  SharedRating, 
  SharedSelectButton, 
  SharedToggleButton, 
  SharedTriStateCheckbox } from "react-together";
import { ReactTogetherManager } from "react-together/components/ReactTogetherManager";

export function WithReactTogetherProvider({children}) {
  return (
    <ReactTogether
      sessionParams={{
        appId: import.meta.env['VITE_APP_ID'],
        apiKey: import.meta.env['VITE_API_KEY']
      }}
    >
      {children}
    </ReactTogether>
  )
}

export function HeroDemo() {
  return (
    <div className='w-full aspect-video bg-white-100 mt-8'>
      <div className="p-5">
        <WithReactTogetherProvider>
          <FakeBrowser>
            <SyncedDemo />
          </FakeBrowser>
        </WithReactTogetherProvider>
      </div>
      <div className="p-5">
        <WithReactTogetherProvider>
          <FakeBrowser>
            <SyncedDemo />
          </FakeBrowser>
        </WithReactTogetherProvider>
      </div>
    </div>
  )
}
export function SyncedDemo() {
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
    <div className='p-3 w-full aspect-video bg-white-100 mt-8'>

      <ConnectedViews maxAvatars={2} />
      {/* <PresenceDiv id="presence-div"></PresenceDiv> */}
      <SyncedTabs />
      <SharedCountButton />
      {/* <ReactTogetherManager /> */}
      <div style={{width:70, display: 'flex', flexDirection: 'row' }}>
        <PresenceDiv id="div1">
          <div className="mx-4 w-40 p-2 bg-blue-900 text-white">
            Hover me!
          </div>
        </PresenceDiv>
        <PresenceDiv id="div2">
          <div className="mx-4 w-40 p-2 bg-blue-900 text-white">
            Hover me!
          </div>
        </PresenceDiv>
        <PresenceDiv id="div3">
          <div className="mx-4 w-40 p-2 bg-blue-900 text-white">
            Hover me!
          </div>
        </PresenceDiv>
      </div>
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
    </div>
  );
}
