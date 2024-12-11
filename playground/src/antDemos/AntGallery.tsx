import { ConnectedUsers, SessionManager, useIsTogether } from 'react-together'
import {
  CalendarTogether as PR_CalendarTogether,
  CheckboxTogether as PR_CheckboxTogether,
  DropdownTogether as PR_DropdownTogether,
  InputSwitchTogether as PR_InputSwitchTogether,
  KnobTogether as PR_KnobTogether,
  MultiSelectTogether as PR_MultiSelectTogether,
  RatingTogether as PR_RatingTogether,
  SelectButtonTogether as PR_SelectButtonTogether,
  ToggleButtonTogether as PR_ToggleButtonTogether
} from 'react-together-primereact'

import {
  CheckboxTogether as AD_CheckboxTogether,
  DatePickerTogether as AD_DatePickerTogether,
  DropdownTogether as AD_DropdownTogether,
  InputSwitchTogether as AD_InputSwitchTogether,
  MultiSelectTogether as AD_MultiSelectTogether,
  RatingTogether as AD_RatingTogether,
  SelectButtonTogether as AD_SelectButtonTogether,
  SliderTogether as AD_SliderTogether,
  ToggleButtonTogether as AD_ToggleButtonTogether,
} from 'react-together-ant-design'


import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons'

const cities = [
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Paris', code: 'PRS' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'New York', code: 'NY' },
]
const options = cities.map(city => ({
  label: city.name,
  value: city.code,
}))

export default function BothGallery() {
  return (
    <div>
      <Header title="AntDesign" />
      <AntGallery />
      <br/>
      <hr />
      <Header title="PrimeReact" />
      <PrimeGallery />
      <hr />
      {/* <DrawOnGridTogether rtKey="draw-grid" width={10} height={10} /> */}
    </div>
  )
}

function AntGallery() {
  const isTogether = useIsTogether()
  return (<div className='flex flex-col gap-2 bg-gray-50 p-2'>
    <CompRow>
      <ConnectedUsers maxAvatars={5} />
    </CompRow>
    <CompRow>
      <div className='text-black'>
        {isTogether ? 'Ants Connected' : 'Ants Disconnected'}
      </div>
    </CompRow>
    <CompRow>
      <AD_CheckboxTogether    rtKey="checkbox" />
      <AD_InputSwitchTogether rtKey="input-switch" />
      <AD_RatingTogether      rtKey="rating" />
    </CompRow>
    <CompRow>
      <AD_DropdownTogether rtKey="ant_dropdown" 
        options={options} 
        className='w-[110px]' 
        placeholder="Select a City"
      />
      <AD_MultiSelectTogether rtKey="ant-multi-select" 
        options={options} 
        className='w-[250px]' 
        placeholder="Select a City"
      />
    </CompRow>
    <CompRow>
      <AD_SelectButtonTogether rtKey="select-button" items={options.slice(0,3)} />
      <AD_ToggleButtonTogether rtKey="toggle-button" />
      <AD_ToggleButtonTogether rtKey="toggle-button" 
        onLabel="On" offLabel="Off" 
        onIcon={<CheckCircleFilled />}
        offIcon={<CloseCircleFilled />}
      />
    </CompRow>
    <CompRow>
      <AD_SliderTogether rtKey="ant_slider" 
        value={50} 
        className='w-[100px]'
      />
      <AD_DatePickerTogether
        rtKey="ant_calendar"
        format="YYYY/MM/DD"
      />
    </CompRow>
  </div>)
}


export function PrimeGallery() {
  const isTogether = useIsTogether()
  return (
    <div className='flex flex-col gap-2 bg-gray-50 p-2'>
      <div className="fixed bottom-2 right-2 z-50">
        <SessionManager />
      </div>
      <div className="flex flex-col gap-2 items-center">
        <ConnectedUsers maxAvatars={5} />
        <div className='text-black'>
          {isTogether ? 'Primes Connected' : 'Primes Disconnected'}
        </div>
        {/* <SamplePage />
        <SyncedTabs /> */}
        <CompRow>
          {/* <CountButtonTogether /> */}
          <PR_CheckboxTogether rtKey="checkbox" />
          {/* <PR_TriStateCheckboxTogether rtKey="tristate-checkbox" /> */}
          <PR_InputSwitchTogether rtKey="input-switch" />
          <PR_RatingTogether rtKey="rating" cancel={false}/>
        </CompRow>
        <CompRow>
          <PR_DropdownTogether
            rtKey="dropdown"
            options={cities}
            optionLabel="name"
            placeholder="Select a City"
            className="w-full md:w-14rem"
          />

          <PR_MultiSelectTogether
            rtKey="pr-multi-select"
            options={cities}
            optionLabel="name"
            multiple
            display="chip"
          />
        </CompRow>
        <CompRow>
          <PR_SelectButtonTogether
            rtKey="select-button"
            options={cities.slice(0,3)}
            optionLabel="name"
          />
          <PR_ToggleButtonTogether rtKey="toggle-button" />
          <PR_ToggleButtonTogether 
            rtKey="toggle-button" 
            onLabel="On" offLabel="Off" 
            onIcon={<CheckIcon />}
            offIcon={<XIcon />}
          />
        </CompRow>
        <CompRow>
          <PR_KnobTogether rtKey="knob" />
          <div className='flex items-center'>
            <PR_CalendarTogether
              rtKey="calendar"
              dateFormat="yy/mm/dd"
              disabledDays={[0, 1]}
              />
            </div>
        </CompRow>
        {/* <NestedHoverHighlighter /> */}
      </div>
    </div>
  )
}
function CompRow({children}: {children: React.ReactNode}) {
  return <div className="flex flex-row justify-center gap-8 mt-2">{children}</div>
}

function CheckIcon() {
  return <div className="mr-2"><CheckCircleFilled /></div>
}

function XIcon() {
  return <div className="mr-2"><CloseCircleFilled /></div>
}

function Header({ title }: { title: string }) {
  return (
    <div>
      <h1 className="flex justify-center">{title}</h1>
      <hr className="border-2 border-gray-300" />
    </div>
  )
}

