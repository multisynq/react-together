import { DatePicker, DatePickerProps } from 'antd'
import { Dayjs } from 'dayjs'
import { useStateTogether } from 'react-together'

export interface CalendarTogetherProps
  extends Omit<DatePickerProps, 'value' | 'onChange'> {
  rtKey: string
}

export default function DatePickerTogether({
  rtKey,
  ...props
}: CalendarTogetherProps) {
  const [value, set_value] = useStateTogether<Dayjs | undefined>(rtKey, undefined)
  return <DatePicker {...props} value={value} onChange={(e) => set_value(e)} />
}
