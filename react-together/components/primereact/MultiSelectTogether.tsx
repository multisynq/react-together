import { MultiSelect, MultiSelectProps } from 'primereact/multiselect'
import { useStateTogether } from '../../hooks'

export interface MultiSelectTogetherProps
  extends Omit<MultiSelectProps, 'value' | 'onChange'> {
  rtid: string
}
export default function MultiSelectTogether({
  rtid,
  ...props
}: MultiSelectTogetherProps) {
  const [value, set_value] = useStateTogether(rtid, [])
  return (
    <MultiSelect
      {...props}
      value={value}
      onChange={(e) => set_value(e.value)}
    />
  )
}
