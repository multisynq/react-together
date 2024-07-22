import { InputSwitch, InputSwitchProps } from 'primereact/inputswitch'
import useSharedState from '../../hooks/useSharedState'

export interface SharedInputSwitchProps
  extends Omit<InputSwitchProps, 'checked' | 'onChange'> {
  rtid: string
}
export default function SharedInputSwitch({
  rtid,
  ...props
}: SharedInputSwitchProps) {
  const [checked, set_checked] = useSharedState<boolean>(rtid, false)

  return (
    <InputSwitch
      {...props}
      checked={checked}
      onChange={(e) => set_checked(e.value)}
    />
  )
}
