import { ToggleButton, ToggleButtonProps } from 'primereact/togglebutton'
import useSharedState from '../../hooks/useSharedState'

export interface SharedToggleButtonProps
  extends Omit<ToggleButtonProps, 'value' | 'onChange'> {
  rtid: string
}
export default function SharedToggleButton({
  rtid,
  ...props
}: SharedToggleButtonProps) {
  const [checked, set_checked] = useSharedState<boolean>(rtid, false)

  return (
    <ToggleButton
      {...props}
      checked={checked}
      onChange={(e) => set_checked(e.value)}
    />
  )
}
