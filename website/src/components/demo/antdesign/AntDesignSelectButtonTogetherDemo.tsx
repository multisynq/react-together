import { SelectButtonTogether } from 'react-together-ant-design'

const options = [
  { label: 'Rome', value: 'RM' },
  { label: 'London', value: 'LDN' },
  { label: 'Paris', value: 'PRS' },
]

export function AntDesignSelectButtonTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      <SelectButtonTogether rtKey='select-button-doc-demo' items={options.slice(0, 3)} />
    </div>
  )
}
