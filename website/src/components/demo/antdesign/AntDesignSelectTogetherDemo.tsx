import { SelectTogether } from 'react-together-ant-design'

const options = [
  { label: 'Rome', value: 'RM' },
  { label: 'London', value: 'LDN' },
  { label: 'Paris', value: 'PRS' },
  { label: 'Istanbul', value: 'IST' },
  { label: 'New York', value: 'NY' },
]

export function AntDesignSelectTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      <SelectTogether rtKey='ant_dropdown' options={options} className='w-[110px]' placeholder='Select a City' />
    </div>
  )
}
