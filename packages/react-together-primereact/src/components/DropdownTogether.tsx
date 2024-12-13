import { useStateTogether } from '@multisynq/react-together'
import { Dropdown, DropdownProps } from 'primereact/dropdown'

export interface DropdownTogetherProps
  extends Omit<DropdownProps, 'value' | 'onChange'> {
  rtKey: string
}
export default function DropdownTogether({
  rtKey,
  ...props
}: DropdownTogetherProps) {
  const [value, set_value] = useStateTogether(rtKey, null)
  return (
    <Dropdown {...props} value={value} onChange={(e) => set_value(e.value)} />
  )
}
