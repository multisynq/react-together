import { ColorPickerTogether } from '@multisynq/react-together-primereact'

export function PrimeReactColorPickerTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      <ColorPickerTogether rtKey='color-picker-doc-demo' publishWhileOpen />
    </div>
  )
}
