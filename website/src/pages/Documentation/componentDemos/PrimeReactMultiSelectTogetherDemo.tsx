import { MultiSelectTogether } from '../../../../../react-together'

export function PrimeReactMultiSelectTogetherDemo() {
  const cities = [
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' },
  ]
  return (
    <div className='flex-col place-items-center'>
      <MultiSelectTogether rtid='multi-select-doc-demo' options={cities} optionLabel='name' multiple display='chip' />
    </div>
  )
}
