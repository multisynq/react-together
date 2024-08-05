import { DemoLink } from '@components/ui/DemoLink'
import { useEffect, useState } from 'react'
import { ConnectedViews, PresenceDiv } from 'react-together'
import { CheckboxTogether, DropdownTogether, KnobTogether, SelectButtonTogether } from 'react-together-primereact'

export default function HeroDemo() {
  const [isHomePage, setIsHomePage] = useState(true)
  const [showLink, setShowLink] = useState(false)

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

  if (!isHomePage) {
    return (
      <div className='bg-[radial-gradient(65.22%_99.35%_at_76.2%_118.78%,#D7E8F8_0%,#FFF_100%)] h-full relative w-full flex justify-center items-center'>
        <div className='flex justify-center absolute bottom-2 right-2'>
          <ConnectedViews maxAvatars={6} />
        </div>
        <div className='w-full flex flex-col items-start rounded-lg border-[1.5px] border-gray700 bg-white overflow-hidden p-3 gap-6 overflow-y-auto mx-2 my-3 max-w-[456px]'>
          <div className='flex items-center justify-between w-full'>
            {['div1', 'div2', 'div3'].map((key) => (
              <PresenceDiv key={key} rtKey={key}>
                <div className='w-18 px-2 py-1 bg-blue-400 cursor-pointer text-center rounded-lg text-gray-50 border-[2px] border-gray-700 shadow-lineStyleDark'>
                  Hover
                </div>
              </PresenceDiv>
            ))}
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
    )
  }

  return (
    <div className='w-full overflow-hidden shadow-lineStyleDark' style={{ aspectRatio: '5 / 3' }}>
      <div className='px-2 py-2 bg-[radial-gradient(65.22%_99.35%_at_76.2%_118.78%,#D7E8F8_0%,#FFF_100%)] h-full'>
        <div className='flex flex-col items-end absolute bottom-2 right-2 gap-2'>
          {showLink && <DemoLink />}
          <div className='flex'>
            <ConnectedViews maxAvatars={6} />
            <button onClick={() => setShowLink(!showLink)}>
              <div className='bg-blue-500 flex rounded-xl justify-center items-center px-2'>
                <p className='text-white font-bold'>+User</p>
              </div>
            </button>
          </div>
        </div>
        <div className='w-full h-full flex gap-2'>
          <div className='h-full flex flex-col items-start w-[20rem] rounded-lg border-[1.5px] border-gray700 bg-white overflow-hidden p-3 gap-6 overflow-y-auto'>
            <div className='flex items-center justify-between w-full'>
              {['div1', 'div2', 'div3'].map((key) => (
                <PresenceDiv key={key} rtKey={key}>
                  <div className='w-18 px-2 py-1 bg-blue-400 cursor-pointer text-center rounded-lg text-gray-50 border-[2px] border-gray-700 shadow-lineStyleDark'>
                    Hover
                  </div>
                </PresenceDiv>
              ))}
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
          <div className='flex-grow flex rounded-lg items-center justify-center'>
            <p className='text-center font-bold text-sm text-gray-300 text-wrap'>
              {`CursorTogether`}
              <br />
              {`[Coming Soon!]`}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
