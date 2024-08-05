import { Calendar, CalendarProps } from 'primereact/calendar'
import { useStateTogether } from 'react-together'

export interface CalendarTogetherProps
  extends Omit<CalendarProps, 'value' | 'onChange'> {
  rtKey: string
}
export default function CalendarTogether({
  rtKey,
  ...props
}: CalendarTogetherProps) {
  const [value, setChecked] = useStateTogether<string | null>(rtKey, null)

  return (
    <Calendar
      {...props}
      onChange={(e) =>
        setChecked(
          e.value === null || e.value === undefined
            ? null
            : e.value.toISOString()
        )
      }
      value={value === null ? value : new Date(value)}
      selectionMode="single"
    />
  )
}
