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
// import { ReactTogetherManager } from "react-together/components/ReactTogetherManager";

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
    <div className='w-full flex flex-wrap justify-center aspect-video bg-white-100 mt-8'>
      <div className="justify-center ">
        <WithReactTogetherProvider>
          <FakeBrowser>
            <SyncedDemo />
          </FakeBrowser>
        </WithReactTogetherProvider>
      </div>
      <div className="mt-[3rem] justify-center">
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
      { name: 'A', value: 1 },
      { name: 'B', value: 2 },
      { name: 'C', value: 3 },
      { name: 'D', value: 4 },
      { name: '❤️', value: 6 },
    ]
  return (
    <div className='px-3 w-full aspect-video bg-white-100 mt-4'>

      <div className="flex justify-center">
        <ConnectedViews maxAvatars={2} />
      </div>
      {/* <PresenceDiv id="presence-div"></PresenceDiv> */}
      {/* <ReactTogetherManager /> */}
      <div className="flex flex-wrap gap-3 mt-4  justify-center">
        <div className="w-[200px]!">
          <SharedCountButton />
        </div>
        <PresenceDiv id="div1">{/* className="hover:outline hover:outline-slate-400 rounded-md">*/}
          <div className="mx-4 w-40 p-2 bg-blue-900 text-white cursor-pointer text-center">
            Hover me!
          </div>
        </PresenceDiv>
        <PresenceDiv id="div2">
          <div className="mx-4 w-40 p-2 bg-blue-900 text-white cursor-pointer text-center">
            No, hover me!
          </div>
        </PresenceDiv>
        <PresenceDiv id="div3">
          <div className="mx-4 w-40 p-2 bg-blue-900 text-white cursor-pointer text-center">
            Hover!
          </div>
        </PresenceDiv>
      </div>

      <div className="flex flex-wrap gap-3 mt-3 justify-center">
        <div className="content-center border p-1">
          <SharedCheckbox rtid="checkbox" />
        </div>
        <div className="content-center border p-1">
          <SharedTriStateCheckbox rtid="tristate-checkbox" />
        </div>
        <div className="content-center border p-1">
          <SharedDropdown
            rtid="dropdown"
            options={cities}
            optionLabel="name"
            placeholder="Select a City"
            className="w-full md:w-14rem"
          />
        </div>
        <div className="content-center border p-1">
          <SharedRating rtid="shared-rating" tooltip="hello" />
        </div>
        <div className="content-center border p-1 pt-2">
          <SharedInputSwitch rtid="input-switch" />
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-4  justify-center">

        <div className="content-center border p-1">
          <SharedSelectButton
            rtid="select-button"
            options={items}
            optionLabel="name"
            />
        </div>
        <div className="content-center border p-1">
          <SharedMultiSelect
            rtid="shared-multi-select"
            options={cities}
            optionLabel="name"
            multiple
            display="chip"
          />
        </div>
        <div className="content-center border p-1">
          <SharedToggleButton rtid="toggle-button" className="border rounded bg-slate-300"/>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mt-4  justify-center">
        <div className="content-center border p-1">
          <SharedKnob rtid="knob1" />
        </div>
        <div className="content-center border p-1">
          <SharedKnob rtid="knob2" />
        </div>
        <div className="content-center border p-1">
          <SharedKnob rtid="knob3" />
        </div>
      </div>
      <SharedCalendar
        rtid="color-picker"
        dateFormat="yy/mm/dd"
        disabledDays={[0, 1]}
        // inline
        invalid
      />
      <SyncedTabs />
    </div>
  );
}
