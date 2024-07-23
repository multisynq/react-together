// import SyncedTabs from '@components/demo/SyncedTabs'
import { FakeBrowser } from '@components/ui/FakeBrowser'
import {
  CheckboxTogether,
  ConnectedViews,
  DropdownTogether,
  // CalendarTogether,
  KnobTogether,
  PresenceDiv,
  ReactTogether,
  SelectButtonTogether,
} from '../../../../react-together'
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
    <div className='px-3 py-4 w-full aspect-video'>
      <div className='flex justify-center absolute bottom-2 right-2'>
        <ConnectedViews maxAvatars={2} />
      </div>
      <div className='absolute top-1/2 left-[82%] transform -translate-x-1/2 -translate-y-1/2 w-192'>
        <h4 className='text-gray-300'>Cursor Together [coming soon!]</h4>
      </div>
      <div className='flex h-full flex-col items-start w-[20rem] rounded-lg border-[1.5px] border-gray700 bg-white overflow-y-auto overflow-hidden p-3 gap-8'>
        {/* <CountButtonTogether /> */}
        <div className='flex items-center justify-between w-full'>
          <PresenceDiv rtid='div1'>
            <div className='w-18 px-2 py-1 bg-orange-400 font-semibold cursor-pointer text-center rounded-lg text-gray-100 border-[2px] border-gray-700 shadow-lineStyle'>
              Hover
            </div>
          </PresenceDiv>
          <PresenceDiv rtid='div2'>
            <div className='w-18 px-2 py-1 bg-indigo-400 font-semibold cursor-pointer text-center rounded-lg text-gray-100 border-[2px] border-gray-700 shadow-lineStyle'>
              Hover
            </div>
          </PresenceDiv>
          <PresenceDiv rtid='div3'>
            <div className='w-18 px-2 py-1 bg-indigo-400 font-semibold cursor-pointer text-center rounded-lg text-gray-100 border-[2px] border-gray-700 shadow-lineStyle'>
              Hover
            </div>
          </PresenceDiv>
          <div className='content-center p-1'>
            <CheckboxTogether rtid='checkbox' />
          </div>
        </div>
        <SelectButtonTogether rtid='select-button' options={items} optionLabel='name' />
        <div className='flex items-center justify-between w-full'>
          {/* <div className='content-center p-1'>
            <TriStateCheckboxTogether rtid='tristate-checkbox' />
          </div> */}
          <DropdownTogether rtid='dropdown' options={cities} optionLabel='name' placeholder='Select a City' className='w-full md:w-14rem' />
          <div className='w-8' />
          <KnobTogether rtid='knob2' size={80} />
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation.
        </p>
      </div>
    </div>
  )
}
