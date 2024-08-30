import { AutoSizeKeepRatio } from '@utils/AutoSizeKeepRatio'
import { Button } from 'primereact/button'
import { useEffect, useState } from 'react'
import { ConnectedViews, PresenceDiv } from 'react-together'
import {
  CheckboxTogether,
  ColorPickerTogether,
  DropdownTogether,
  InputSwitchTogether,
  SelectButtonTogether,
  TriStateCheckboxTogether,
} from 'react-together-primereact'
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

function UIWrapper({ children, label }) {
  return (
    <div className='flex flex-col gap-2 py-1'>
      <span className='text-xs text-neutral-500 tracking-tight'>{label}</span>
      {children}
    </div>
  )
}

const HoverPrese = () => (
  <UIWrapper label={'Hover'}>
    <PresenceDivStyled key='hover-presence' rtKey='hover-presence' animation='hoverBob 1s infinite ease-in-out'>
      <Button label='Here' size='small' />
    </PresenceDivStyled>
  </UIWrapper>
)

const InputSwithchWithPrese = () => (
  <UIWrapper label={'Input Swtich'}>
    <PresenceDiv rtKey='input-switch-presence'>
      <InputSwitchTogether rtKey='input-switch' />
    </PresenceDiv>
  </UIWrapper>
)

const CheckBoxWithPrese = () => (
  <UIWrapper label={'Checkbox'}>
    <PresenceDiv rtKey='checkbox-presence'>
      <CheckboxTogether rtKey='checkbox' />
    </PresenceDiv>{' '}
  </UIWrapper>
)

const TriStatePrese = () => (
  <UIWrapper label={'Tri State'}>
    <PresenceDiv rtKey='triState-presence'>
      <TriStateCheckboxTogether rtKey='triState' />
    </PresenceDiv>
  </UIWrapper>
)

const ColorPickerPrese = () => (
  <UIWrapper label={'Colors'}>
    <PresenceDiv
      rtKey='hero-demo-color-picker-presence'
      className='flex justify-center items-center gap-1 border mx-0 rounded-md border-gray-300 px-2 h-[48px]'
    >
      <ColorPickerTogether rtKey='hero-demo-color-picker' publishWhileOpen defaultColor='#93C5FD' />
      <p className='text-gray-700 text-xs'>Color Picker</p>
    </PresenceDiv>
  </UIWrapper>
)

const CityDropdownPrese = () => (
  <UIWrapper label={'Drop Down'}>
    <PresenceDiv rtKey='dropdown-presence'>
      <DropdownTogether rtKey='dropdown' options={CITIES} optionLabel='name' placeholder='Select a City' className='w-auto md:w-14rem' />
    </PresenceDiv>
  </UIWrapper>
)

const SelectButtonPrese = () => (
  <UIWrapper label={'Select'}>
    <PresenceDiv rtKey='select-button-presence'>
      <SelectButtonTogether rtKey='select-button' options={ITEMS} optionLabel='name' />
    </PresenceDiv>
  </UIWrapper>
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
  <div className='bg-[radial-gradient(65.22%_99.35%_at_76.2%_118.78%,#D7E8F8_0%,#FFF_100%)] flex w-full h-full items-center'>
    <div className='w-full overflow-hidden' style={{ aspectRatio: '5 / 3' }}>
      <div className='w-full h-full px-2 py-4 flex ml-4'>
        <div className='w-1/2'>
          <AutoSizeKeepRatio maxHeight={364} maxWidth={320}>
            <div className='w-full h-full flex flex-col'>
              <span className='tracking-tighter font-bold text-neutral-300'>Sample UI</span>
              <div className='w-full flex flex-col items-start rounded-lg border border-gray700 overflow-hidden p-3 gap-1 overflow-y-auto h-full mt-2 bg-white'>
                <div className='flex gap-4 justify-between'>
                  <HoverPrese />
                  <InputSwithchWithPrese />
                  <CheckBoxWithPrese />
                  <TriStatePrese />
                </div>
                <div className='flex gap-4 mt-4 border-t w-full pt-2 justify-between'>
                  <ColorPickerPrese />
                  <CityDropdownPrese />
                </div>
                <div className='flex gap-4 mt-4 border-t w-full'>
                  <SelectButtonPrese />
                </div>
              </div>
            </div>
          </AutoSizeKeepRatio>
        </div>
        <div className='w-1/2 flex items-center justify-center'>
          <AutoSizeKeepRatio maxHeight={664} maxWidth={444}>
            <TinyRpgTogether />
          </AutoSizeKeepRatio>
        </div>
      </div>
      <ConnectedViewsWrapper />
    </div>
  </div>
)

const HomePage = () => (
  <div className='w-full overflow-hidden shadow-lineStyleDark' style={{ aspectRatio: '5 / 3' }}>
    <div className='w-full h-full bg-[radial-gradient(65.22%_99.35%_at_76.2%_118.78%,#D7E8F8_0%,#FFF_100%)] px-2 py-4 flex'>
      <div className='w-1/2'>
        <AutoSizeKeepRatio maxHeight={364} maxWidth={320}>
          <div className='w-full h-full flex flex-col'>
            <span className='tracking-tighter font-bold text-neutral-300'>Sample UI</span>
            <div className='w-full flex flex-col items-start rounded-lg border border-gray700 overflow-hidden p-3 gap-1 overflow-y-auto h-full mt-2 bg-white'>
              <div className='flex gap-4 justify-between'>
                <HoverPrese />
                <InputSwithchWithPrese />
                <CheckBoxWithPrese />
                <TriStatePrese />
              </div>
              <div className='flex gap-4 mt-4 border-t w-full pt-2 justify-between'>
                <ColorPickerPrese />
                <CityDropdownPrese />
              </div>
              <div className='flex gap-4 mt-4 border-t w-full'>
                <SelectButtonPrese />
              </div>
            </div>
          </div>
        </AutoSizeKeepRatio>
      </div>
      <div className='w-1/2 flex items-center justify-center'>
        <AutoSizeKeepRatio maxHeight={664} maxWidth={444}>
          <TinyRpgTogether />
        </AutoSizeKeepRatio>
      </div>
    </div>
    <ConnectedViewsWrapper />
  </div>
)

// Main component
export default function HeroDemo() {
  const isHomePage = useMessageHandler()

  return isHomePage ? <HomePage /> : <NonHomePage />
}
