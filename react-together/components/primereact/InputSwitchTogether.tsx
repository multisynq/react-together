import { InputSwitch, InputSwitchProps } from 'primereact/inputswitch'
import { useStateTogether } from '../../hooks'

export interface InputSwitchTogetherProps
  extends Omit<InputSwitchProps, 'checked' | 'onChange'> {
  rtKey: string
}
export default function InputSwitchTogether({
  rtKey,
  ...props
}: InputSwitchTogetherProps) {
  const [checked, set_checked] = useStateTogether<boolean>(rtKey, false)

  return (
    <InputSwitch
      {...props}
      checked={checked}
      onChange={(e) => set_checked(e.value)}
    />
  )
}
