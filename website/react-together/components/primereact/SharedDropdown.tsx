import { Dropdown, DropdownProps } from 'primereact/dropdown'
import useSharedState from '../../hooks/useSharedState'

export interface SharedDropdownProps
  extends Omit<DropdownProps, 'value' | 'onChange'> {
  rtid: string
}
export default function SharedDropdown({
  rtid,
  ...props
}: SharedDropdownProps) {
  const [value, set_value] = useSharedState(rtid, null)
  return (
    <Dropdown {...props} value={value} onChange={(e) => set_value(e.value)} />
  )
}
