import { MultiSelect, MultiSelectProps } from 'primereact/multiselect'
import useSharedState from '../../hooks/useSharedState'

export interface SharedMultiSelectProps
  extends Omit<MultiSelectProps, 'value' | 'onChange'> {
  rtid: string
}
export default function SharedMultiSelect({
  rtid,
  ...props
}: SharedMultiSelectProps) {
  const [value, set_value] = useSharedState(rtid, [])
  return (
    <MultiSelect
      {...props}
      value={value}
      onChange={(e) => set_value(e.value)}
    />
  )
}
