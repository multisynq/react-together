import { Calendar, CalendarProps } from 'primereact/calendar'
import useSharedState from '../../hooks/useSharedState'

export interface SharedCalendarProps
  extends Omit<CalendarProps, 'value' | 'onChange'> {
  rtid: string
}
export default function SharedCalendar({
  rtid,
  ...props
}: SharedCalendarProps) {
  const [value, setChecked] = useSharedState<string | null>(rtid, null)

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
