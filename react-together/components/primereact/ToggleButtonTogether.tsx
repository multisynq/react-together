import { ToggleButton, ToggleButtonProps } from 'primereact/togglebutton'
import { useStateTogether } from '../../hooks'

export interface ToggleButtonTogetherProps
  extends Omit<ToggleButtonProps, 'value' | 'onChange'> {
  rtid: string
}
export default function ToggleButtonTogether({
  rtid,
  ...props
}: ToggleButtonTogetherProps) {
  const [checked, set_checked] = useStateTogether<boolean>(rtid, false)

  return (
    <ToggleButton
      {...props}
      checked={checked}
      onChange={(e) => set_checked(e.value)}
    />
  )
}
