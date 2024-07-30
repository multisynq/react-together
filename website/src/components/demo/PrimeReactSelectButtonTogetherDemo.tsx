import { SelectButtonTogether } from '../../../../react-together'

export function PrimeReactSelectButtonTogetherDemo() {
  const items = [
    { name: 'Option 1', value: 1 },
    { name: 'Option 2', value: 2 },
    { name: 'Option 3', value: 3, disabled: false },
  ]
  return (
    <div className='flex-col place-items-center'>
      <SelectButtonTogether rtid='select-button-doc-demo' options={items} optionLabel='name' />
    </div>
  )
}
