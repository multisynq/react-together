// import SyncedTabs from '@components/demo/SyncedTabs'
import { FakeBrowser } from '@components/ui/FakeBrowser'
import {
  CheckboxTogether,
  ConnectedViews,
  DropdownTogether,
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
    <div className='w-full flex items-center flex-wrap gap-3 justify-center bg-white-100 mt-8'>
      <WithReactTogetherProvider>
        <FakeBrowser>
          <div
            className='flex-[1_0_0] bg-[radial-gradient(65.22%_99.35%_at_76.2%_118.78%,#D7E8F8_0%,#FFF_100%)] relative sm:min-w-[29.75rem]'
            style={{ aspectRatio: '5 / 3' }}
          >
            <SyncedDemo />
          </div>
        </FakeBrowser>
      </WithReactTogetherProvider>
      <WithReactTogetherProvider>
        <FakeBrowser>
          <div
            className='flex-[1_0_0] bg-[radial-gradient(65.22%_99.35%_at_76.2%_118.78%,#F8F3D7_0%,#FFF_100%)] relative sm:min-w-[29.75rem]'
            style={{ aspectRatio: '5 / 3' }}
          >
            <SyncedDemo />
          </div>
        </FakeBrowser>
      </WithReactTogetherProvider>
    </div>
  )
}
export function SyncedDemo() {
  const cities = [
    { name: 'Lisbon', code: 'LIS' },
    { name: 'New York', code: 'NY' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
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
        <h4 className='hidden sm:block text-gray-300'>Cursor Together [coming soon!]</h4>
      </div>
      <div className='flex h-full flex-col items-start w-[20rem] rounded-lg border-[1.5px] border-gray700 bg-white overflow-y-auto overflow-hidden overflow-x-auto p-3 gap-8'>
        {/* <CountButtonTogether /> */}
        <div className='flex items-center justify-between w-full'>
          <PresenceDiv rtid='div1'>
            <div className='w-18 px-2 py-1 bg-orange-400 font-semibold cursor-pointer text-center rounded-lg text-gray-100 border-[2px] border-gray-700 shadow-lineStyleDark'>
              Hover
            </div>
          </PresenceDiv>
          <PresenceDiv rtid='div2'>
            <div className='w-18 px-2 py-1 bg-indigo-400 font-semibold cursor-pointer text-center rounded-lg text-gray-100 border-[2px] border-gray-700 shadow-lineStyleDark'>
              Hover
            </div>
          </PresenceDiv>
          <PresenceDiv rtid='div3'>
            <div className='w-18 px-2 py-1 bg-indigo-400 font-semibold cursor-pointer text-center rounded-lg text-gray-100 border-[2px] border-gray-700 shadow-lineStyleDark'>
              Hover
            </div>
          </PresenceDiv>
          <div className='content-center p-1'>
            <PresenceDiv rtid='checkbox-presence'>
              <CheckboxTogether rtid='checkbox' />
            </PresenceDiv>
          </div>
        </div>
        <PresenceDiv rtid='select-button-presence'>
          <SelectButtonTogether
            rtid='select-button'
            options={items}
            optionLabel='name'
            itemTemplate={(item) => {
              return (
                <PresenceDiv rtid={`select-button-option-${item.name}`}>
                  {/* <div className='p-button p-component border h-[15px] null' role='button' aria-label={item.name} data-pc-section='button'> */}
                  <span className='p-button-label p-c' data-pc-section='label'>
                    {item.name}
                  </span>
                  {/* </div> */}
                </PresenceDiv>
              )
            }}
          />
        </PresenceDiv>
        <div className='flex items-center justify-between w-full'>
          {/* <div className='content-center p-1'>
            <TriStateCheckboxTogether rtid='tristate-checkbox' />
          </div> */}
          <PresenceDiv rtid='dropdown-presence'>
            <DropdownTogether
              rtid='dropdown'
              options={cities}
              optionLabel='name'
              placeholder='Select a City'
              className='w-full md:w-14rem'
            />
          </PresenceDiv>
          <div className='w-8' />
          <PresenceDiv rtid='knob2-presence'>
            <KnobTogether rtid='knob2' size={80} />
          </PresenceDiv>
        </div>
        {/* <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation.
        </p> */}
      </div>
    </div>
  )
}
