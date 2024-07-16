import SharedCountButton from '@components/demo/SharedCountButton'
// import SyncedTabs from '@components/demo/SyncedTabs'
import { FakeBrowser } from '@components/ui/FakeBrowser'
import {
  ConnectedViews,
  PresenceDiv,
  ReactTogether,
  SharedCheckbox,
  SharedDropdown,
  SharedInputSwitch,
  SharedSelectButton,
  SharedTriStateCheckbox,
  // SharedCalendar,
  // SharedKnob,
  // SharedMultiSelect,
  // SharedRating,
  // SharedToggleButton,
} from '../../../react-together'
// import { ReactTogetherManager } from "react-together/components/ReactTogetherManager";

export function WithReactTogetherProvider({ children }) {
  return (
    <ReactTogether
      sessionParams={{
        appId: import.meta.env['VITE_APP_ID'],
        apiKey: import.meta.env['VITE_API_KEY'],
      }}
    >
      {children}
    </ReactTogether>
  )
}

export function HeroDemo() {
  return (
    <div className='w-full flex items-center flex-wrap gap-3 min-w-[32rem] justify-center bg-white-100 mt-8'>
      <div
        className='min-w-[29.75rem] flex-[1_0_0] bg-[radial-gradient(65.22%_99.35%_at_76.2%_118.78%,#D7E8F8_0%,#FFF_100%)] relative'
        style={{ aspectRatio: '5 / 3' }}
      >
        <WithReactTogetherProvider>
          <FakeBrowser>
            <SyncedDemo />
          </FakeBrowser>
        </WithReactTogetherProvider>
      </div>
      <div
        className='min-w-[29.75rem] flex-[1_0_0] bg-[radial-gradient(65.22%_99.35%_at_76.2%_118.78%,#F8F3D7_0%,#FFF_100%)] relative'
        style={{ aspectRatio: '5 / 3' }}
      >
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
    { name: 'Paris', code: 'PRS' },
  ]
  const items = [
    { name: 'A', value: 1 },
    { name: 'B', value: 2 },
    { name: 'C', value: 3 },
    { name: 'D', value: 4 },
    { name: '❤️', value: 6 },
  ]
  return (
    <div className='px-3 py-3 w-full aspect-video'>
      <div className='flex justify-center absolute bottom-2 right-2'>
        <ConnectedViews maxAvatars={2} />
      </div>
      <div className='absolute top-1/2 left-[82%] transform -translate-x-1/2 -translate-y-1/2 w-192'>
        <h4 className='text-gray-300'>Cursor Together</h4>
      </div>
      {/* <div className='pt-1 px-3 pb-0'>
        <h4 className='text-gray-300'>UI Together</h4>
      </div> */}
      {/* <div className='flex flex-col justify-between items-start w-[18.75rem] h-full bg-black'> */}
      {/* <div className='flex h-full flex-col justify-between items-start w-[20rem] p-[0.75rem_1rem] flex-1 rounded-lg border border-[#E5E5E7] bg-white'> */}
      <div className='flex h-full flex-col items-start w-[20rem] rounded-lg border border-black bg-white overflow-y-auto overflow-hidden'>
        <div className='overflow-y-auto h-fulls p-4 custom-scrollbar'>
          {/* <SharedCountButton /> */}

          <div className='flex items-center gap-0'>
            <PresenceDiv id='div1'>
              <div className='mx-2 w-16 p-2 bg-blue-900 text-white cursor-pointer text-center'>Hover</div>
            </PresenceDiv>
            <PresenceDiv id='div2'>
              <div className='mx-2 w-16 p-2 bg-blue-900 text-white cursor-pointer text-center'>Hover</div>
            </PresenceDiv>
            <PresenceDiv id='div3'>
              <div className='mx-2 w-16 p-2 bg-blue-900 text-white cursor-pointer text-center'>Hover</div>
            </PresenceDiv>
          </div>
          <div className='flex items-center gap-0'>
            <div className='content-center p-1'>
              <SharedCheckbox rtid='checkbox' />
            </div>
            <div className='content-center p-1'>
              <SharedTriStateCheckbox rtid='tristate-checkbox' />
            </div>
            <div className='content-center p-1 pt-2'>
              <SharedInputSwitch rtid='input-switch' />
            </div>
            <div className='content-center p-1'>
              <SharedDropdown
                rtid='dropdown'
                options={cities}
                optionLabel='name'
                placeholder='Select a City'
                className='w-full md:w-14rem'
              />
            </div>
          </div>
          <div className='content-center px-4 py-8'>
            <SharedSelectButton rtid='select-button' options={items} optionLabel='name' />
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
            enim ad minim veniam, quis nostrud exercitation.
          </p>
          {/* <SharedCalendar
          rtid='color-picker'
          dateFormat='yy/mm/dd'
          disabledDays={[0, 1]}
          // inline
          invalid
        /> */}
        </div>
        {/* <>
              <div className='content-center border p-1'>
          <SharedRating rtid='shared-rating' tooltip='hello' />
        </div>

        <div className='content-center border p-1'>
          <SharedSelectButton rtid='select-button' options={items} optionLabel='name' />
        </div>
        <div className='content-center border p-1'>
          <SharedMultiSelect rtid='shared-multi-select' options={cities} optionLabel='name' multiple display='chip' />
        </div>
        <div className='content-center border p-1'>
          <SharedToggleButton rtid='toggle-button' className='border rounded bg-slate-300' />
        </div>

        <div className='flex flex-wrap gap-3 mt-4  justify-center'>
          <div className='content-center border p-1'>
            <SharedKnob rtid='knob1' />
          </div>
          <div className='content-center border p-1'>
            <SharedKnob rtid='knob2' />
          </div>
          <div className='content-center border p-1'>
            <SharedKnob rtid='knob3' />
          </div>
        </div>
        <SharedCalendar
          rtid='color-picker'
          dateFormat='yy/mm/dd'
          disabledDays={[0, 1]}
          // inline
          invalid
        />
        <SyncedTabs />
      </> */}
      </div>
    </div>
  )
}
