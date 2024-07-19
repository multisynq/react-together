import { Dropdown, DropdownProps } from 'primereact/dropdown'
import { useStateTogether } from '../../hooks'

export interface DropdownTogetherProps
  extends Omit<DropdownProps, 'value' | 'onChange'> {
  rtid: string
}
export default function DropdownTogether({
  rtid,
  ...props
}: DropdownTogetherProps) {
  const [value, set_value] = useStateTogether(rtid, null)
  return (
    <Dropdown {...props} value={value} onChange={(e) => set_value(e.value)} />
  )
}
