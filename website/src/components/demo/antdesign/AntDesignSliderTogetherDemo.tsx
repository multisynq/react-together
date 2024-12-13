import { SliderTogether } from '@multisynq/react-together-ant-design'

export function AntDesignSliderTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      <SliderTogether rtKey='ant-slider-doc-demo' value={50} className='w-[150px]' />
    </div>
  )
}
