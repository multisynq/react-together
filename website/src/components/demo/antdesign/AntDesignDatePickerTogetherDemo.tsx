import { DatePickerTogether } from '@multisynq/react-together-ant-design'

export function AntDesignDatePickerTogetherDemo() {
  return (
    <div className='flex-col place-items-center'>
      <DatePickerTogether rtKey='date-picker-doc-demo' format='YYYY/MM/DD' />
    </div>
  )
}
