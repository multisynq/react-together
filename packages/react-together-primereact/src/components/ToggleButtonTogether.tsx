import { useStateTogether } from '@multisynq/react-together'
import { ToggleButton, ToggleButtonProps } from 'primereact/togglebutton'

export interface ToggleButtonTogetherProps
  extends Omit<ToggleButtonProps, 'value' | 'onChange'> {
  rtKey: string
}
export default function ToggleButtonTogether({
  rtKey,
  ...props
}: ToggleButtonTogetherProps) {
  const [checked, set_checked] = useStateTogether<boolean>(rtKey, false)

  return (
    <ToggleButton
      {...props}
      checked={checked}
      onChange={(e) => set_checked(e.value)}
    />
  )
}
