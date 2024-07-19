import { InputSwitch, InputSwitchProps } from 'primereact/inputswitch'
import { useStateTogether } from '../../hooks'

export interface InputSwitchTogetherProps
  extends Omit<InputSwitchProps, 'checked' | 'onChange'> {
  rtid: string
}
export default function InputSwitchTogether({
  rtid,
  ...props
}: InputSwitchTogetherProps) {
  const [checked, set_checked] = useStateTogether<boolean>(rtid, false)

  return (
    <InputSwitch
      {...props}
      checked={checked}
      onChange={(e) => set_checked(e.value)}
    />
  )
}
