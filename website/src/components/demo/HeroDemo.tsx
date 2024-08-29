import { useEffect, useState } from 'react'
import { ConnectedViews, PresenceDiv } from 'react-together'
import { CheckboxTogether, ColorPickerTogether, DropdownTogether, SelectButtonTogether } from 'react-together-primereact'
import { PresenceDivStyled } from '../ui/PresenceDivStyled'
import TinyRpgTogether from './TinyRpg'

// Constants
const CITIES = [
  { name: 'Apex', code: 'APX' },
  { name: 'Austin', code: 'AUS' },
  { name: 'Lisbon', code: 'LIS' },
  { name: 'London', code: 'LON' },
  { name: 'Los Angeles', code: 'LOS' },
  { name: 'Magdeburg', code: 'MGB' },
  { name: 'Seattle', code: 'SEA' },
  { name: 'Tokyo', code: 'TKY' },
]

const ITEMS = [
  { name: 'A', value: 1 },
  { name: 'B', value: 2 },
  { name: 'C', value: 3 },
  { name: 'D', value: 4 },
  { name: '❤️', value: 6 },
]

const HOVER_BUTTONS = [
  { key: 'div1', rtKey: 'div1', animation: 'hoverBob 1s infinite ease-in-out' },
  { key: 'div2', rtKey: 'div2', animation: 'hoverIn 1s forwards ease' },
  { key: 'div3', rtKey: 'div3', animation: 'hoverOut 1s infinite ease-in-out' },
]

// Custom hook for message handling
const useMessageHandler = () => {
  const [isHomePage, setIsHomePage] = useState(true)

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.source === window.parent) {
        setIsHomePage(false)
      }
    }

    window.addEventListener('message', handleMessage)
    window.parent.postMessage('getUrl', '*')

    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [])

  return isHomePage
}

// Reusable components
const HoverButtons = () => (
  <>
    {HOVER_BUTTONS.map(({ key, rtKey, animation }) => (
      <PresenceDivStyled key={key} rtKey={rtKey} animation={animation}>
        <div className='w-16 h-8 px-2 py-1 bg-blue-300 cursor-pointer text-center rounded-md text-gray-600 text-sm flex items-center justify-center font-base border border-gray-400 hover:bg-blue-500 hover:text-gray-50'>
          Hover
        </div>
      </PresenceDivStyled>
    ))}
  </>
)

const ColorPickerWithLabel = () => (
  <PresenceDiv
    rtKey='hero-demo-color-picker-presence'
    className='flex justify-center items-center gap-1 border mx-0 rounded-md border-gray-300 px-2 h-[48px]'
  >
    <ColorPickerTogether rtKey='hero-demo-color-picker' publishWhileOpen defaultColor='#93C5FD' />
    <p className='text-gray-700 text-xs'>Color Picker</p>
  </PresenceDiv>
)

const CityDropdown = () => (
  <PresenceDiv rtKey='dropdown-presence'>
    <DropdownTogether rtKey='dropdown' options={CITIES} optionLabel='name' placeholder='Select a City' className='w-auto md:w-14rem' />
  </PresenceDiv>
)

const ConnectedViewsWrapper = () => (
  <div className='flex flex-col items-end absolute bottom-2 right-2 gap-2'>
    <div className='flex gap-1 items-end'>
      <ConnectedViews maxAvatars={6} />
    </div>
  </div>
)

// Main components
const NonHomePage = () => (
  <div className='bg-[radial-gradient(65.22%_99.35%_at_76.2%_118.78%,#D7E8F8_0%,#FFF_100%)] h-full relative w-full flex justify-center items-center'>
    <div className='flex justify-center absolute bottom-2 right-2'>
      <ConnectedViews maxAvatars={6} />
    </div>
    <div className='w-full flex flex-col items-start rounded-lg border border-gray700 bg-white overflow-hidden p-3 gap-6 overflow-y-auto mx-2 my-3 max-w-[360px]'>
      <div className='w-full items-center justify-center flex'>
        <PresenceDiv rtKey='select-button-presence'>
          <SelectButtonTogether rtKey='select-button' options={ITEMS} optionLabel='name' />
        </PresenceDiv>
      </div>
      <div className='flex items-center justify-between w-full'>
        <HoverButtons />
        <PresenceDiv rtKey='checkbox-presence'>
          <CheckboxTogether rtKey='checkbox' />
        </PresenceDiv>
      </div>
      <div className='flex items-center justify-between w-full h-full'>
        <ColorPickerWithLabel />
        <div className='w-auto' />
        <CityDropdown />
      </div>
    </div>
  </div>
)

const HomePage = () => (
  <div className='w-full overflow-hidden shadow-lineStyleDark' style={{ aspectRatio: '5 / 3' }}>
    <div className='px-2 py-2 bg-[radial-gradient(65.22%_99.35%_at_76.2%_118.78%,#D7E8F8_0%,#FFF_100%)] h-full'>
      <div className='w-full h-full flex gap-2'>
        <div className='h-full flex flex-col items-start w-[20rem] rounded-lg border border-gray700 bg-white overflow-hidden p-3 gap-6 overflow-y-auto'>
          <PresenceDiv rtKey='select-button-presence'>
            <SelectButtonTogether rtKey='select-button' options={ITEMS} optionLabel='name' />
          </PresenceDiv>
          <div className='flex items-center justify-between w-full'>
            <HoverButtons />
            <PresenceDiv rtKey='checkbox-presence'>
              <CheckboxTogether rtKey='checkbox' />
            </PresenceDiv>
          </div>
          <div className='flex items-center justify-between w-full'>
            <ColorPickerWithLabel />
            <div className='w-auto' />
            <CityDropdown />
          </div>
        </div>
        <div className='flex-grow flex rounded-lg items-center justify-center'>
          <TinyRpgTogether />
          {/* <p className='text-center font-bold text-sm text-gray-300 text-wrap'>
            {'CursorTogether'}
            <br />
            {'[Coming Soon!]'}
          </p> */}
        </div>
      </div>
      <ConnectedViewsWrapper />
    </div>
  </div>
)

// Main component
export default function HeroDemo() {
  const isHomePage = useMessageHandler()

  return isHomePage ? <HomePage /> : <NonHomePage />
}
