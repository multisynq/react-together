import { Calendar, CalendarProps } from 'primereact/calendar'
import { useStateTogether } from '../../hooks'

export interface CalendarTogetherProps
  extends Omit<CalendarProps, 'value' | 'onChange'> {
  rtid: string
}
export default function CalendarTogether({
  rtid,
  ...props
}: CalendarTogetherProps) {
  const [value, setChecked] = useStateTogether<string | null>(rtid, null)

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
