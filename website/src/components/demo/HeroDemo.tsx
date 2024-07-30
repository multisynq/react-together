import {
  CheckboxTogether,
  ConnectedViews,
  DropdownTogether,
  KnobTogether,
  PresenceDiv,
  SelectButtonTogether,
} from '../../../../react-together'

export default function HeroDemo() {
  const cities = [
    { name: 'Apex', code: 'APX' },
    { name: 'Austin', code: 'AUS' },
    { name: 'Lisbon', code: 'LIS' },
    { name: 'London', code: 'LON' },
    { name: 'Los Angeles', code: 'LOS' },
    { name: 'Magdeburg', code: 'MGB' },
    { name: 'Seattle', code: 'SEA' },
    { name: 'Tokyo', code: 'TKY' },
  ]
  const items = [
    { name: 'A', value: 1 },
    { name: 'B', value: 2 },
    { name: 'C', value: 3 },
    { name: 'D', value: 4 },
    { name: '❤️', value: 6 },
  ]
  return (
    <div
      className='flex-[1_0_0] bg-[radial-gradient(65.22%_99.35%_at_76.2%_118.78%,#D7E8F8_0%,#FFF_100%)] relative sm:min-w-[26rem]'
      style={{ aspectRatio: '5 / 3' }}
    >
      <div className='px-3 py-4 w-full aspect-video'>
        <div className='flex justify-center absolute bottom-2 right-2'>
          <ConnectedViews maxAvatars={6} />
        </div>
        <div className='absolute top-1/2 left-[85%] transform -translate-x-1/2 -translate-y-1/2 w-192'>
          <h5 className='hidden sm:block text-gray-300 text-center'>Cursor Together [coming soon!]</h5>
        </div>
        <div className='flex h-full flex-col items-start w-[20rem] rounded-lg border-[1.5px] border-gray700 bg-white overflow-y-auto overflow-hidden overflow-x-auto p-3 gap-8'>
          {/* <CountButtonTogether /> */}
          <div className='flex items-center justify-between w-full'>
            <PresenceDiv rtid='div1'>
              <div className='w-18 px-2 py-1 bg-orange-400 cursor-pointer text-center rounded-lg text-white border-[2px] border-gray-700 shadow-lineStyleDark'>
                Hover
              </div>
            </PresenceDiv>
            <PresenceDiv rtid='div2'>
              <div className='w-18 px-2 py-1 bg-indigo-400 cursor-pointer text-center rounded-lg text-white border-[2px] border-gray-700 shadow-lineStyleDark'>
                Hover
              </div>
            </PresenceDiv>
            <PresenceDiv rtid='div3'>
              <div className='w-18 px-2 py-1 bg-emerald-400 cursor-pointer text-center rounded-lg text-white border-[2px] border-gray-700 shadow-lineStyleDark'>
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
            <SelectButtonTogether rtid='select-button' options={items} optionLabel='name' />
          </PresenceDiv>
          <div className='flex items-center justify-between w-full'>
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
        </div>
      </div>
    </div>
  )
}
