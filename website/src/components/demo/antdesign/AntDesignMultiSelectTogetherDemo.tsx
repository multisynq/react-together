import { MultiSelectTogether } from 'react-together-ant-design'

const options = [
  { label: 'Rome',     value: 'RM' },
  { label: 'London',   value: 'LDN' },
  { label: 'Paris',    value: 'PRS' },
  { label: 'Istanbul', value: 'IST' },
  { label: 'New York', value: 'NY' },
]

export function AntDesignMultiSelectTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      <MultiSelectTogether rtKey="ant-multi-select" 
        options={options} 
        className='w-[250px]' 
        placeholder="Select a City"
      />
    </div>
  )
}