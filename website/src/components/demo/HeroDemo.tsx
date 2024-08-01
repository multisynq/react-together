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
    <div className='w-full border-2 rounded-xl border-gray-700 overflow-hidden shadow-lineStyleDark' style={{ aspectRatio: '5 / 3' }}>
      <div className='border-line flex flex-col w-full h-full relative'>
        {/* <FakeBrowser /> */}
        <div className='w-full flex items-center gap-4 bg-gray-200 h-14 border-b-[1.5px] border-black px-3'>
          <div className='flex gap-2'>
            <div className='bg-red-500 rounded-xl h-[10px] w-[10px] border border-black' />
            <div className='bg-yellow-400 rounded-xl h-[10px] w-[10px] border border-black' />
            <div className='bg-green-600 rounded-xl h-[10px] w-[10px] border border-black' />
          </div>
          <div className='w-full border border-black bg-white rounded-sm h-8 items-center flex px-2 '>
            <p className='text-xs w-full'>https://your-website.com</p>
          </div>
          <div className='flex flex-col gap-1'>
            <div className='bg-gray-400 w-[22px] h-[3px] rounded-xl' />
            <div className='bg-gray-400 w-[22px] h-[3px] rounded-xl' />
            <div className='bg-gray-400 w-[22px] h-[3px] rounded-xl' />
          </div>
        </div>
        <div className='px-2 py-2 bg-[radial-gradient(65.22%_99.35%_at_76.2%_118.78%,#D7E8F8_0%,#FFF_100%)] h-full'>
          <div className='flex justify-center absolute bottom-2 right-2'>
            <button>Add User</button>
            <ConnectedViews maxAvatars={6} />
          </div>
          <div className='absolute top-1/2 left-[85%] transform -translate-x-1/2 -translate-y-1/2 w-192'>
            <h5 className='sm:block text-gray-300 text-center'>Cursor Together [coming soon!]</h5>
          </div>

          <div className='h-full flex flex-col items-start w-[20rem] rounded-lg border-[1.5px] border-gray700 bg-white overflow-hidden p-3 gap-6 overflow-y-auto'>
            <div className='flex items-center justify-between w-full'>
              <PresenceDiv rtKey='div1'>
                <div className='w-18 px-2 py-1 bg-blue-400 cursor-pointer text-center rounded-lg text-gray-50 border-[2px] border-gray-700 shadow-lineStyleDark'>
                  Hover
                </div>
              </PresenceDiv>
              <PresenceDiv rtKey='div2'>
                <div className='w-18 px-2 py-1 bg-blue-400 cursor-pointer text-center rounded-lg text-gray-50 border-[2px] border-gray-700 shadow-lineStyleDark'>
                  Hover
                </div>
              </PresenceDiv>
              <PresenceDiv rtKey='div3'>
                <div className='w-18 px-2 py-1 bg-blue-400 cursor-pointer text-center rounded-lg text-gray-50 border-[2px] border-gray-700 shadow-lineStyleDark'>
                  Hover
                </div>
              </PresenceDiv>
              <div className='content-center p-1'>
                <PresenceDiv rtKey='checkbox-presence'>
                  <CheckboxTogether rtKey='checkbox' />
                </PresenceDiv>
              </div>
            </div>
            <PresenceDiv rtKey='select-button-presence'>
              <SelectButtonTogether rtKey='select-button' options={items} optionLabel='name' />
            </PresenceDiv>

            <div className='flex items-center justify-between w-full'>
              <PresenceDiv rtKey='dropdown-presence'>
                <DropdownTogether
                  rtKey='dropdown'
                  options={cities}
                  optionLabel='name'
                  placeholder='Select a City'
                  className='w-full md:w-14rem'
                />
              </PresenceDiv>
              <div className='w-8' />
              <PresenceDiv rtKey='knob2-presence'>
                <KnobTogether rtKey='knob2' size={80} />
              </PresenceDiv>
            </div>
          </div>
        </div>
      </div>
      {/* <TinyRpgTogether /> */}
    </div>
  )
}
