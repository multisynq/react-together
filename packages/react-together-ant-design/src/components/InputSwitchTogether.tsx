// AntDesign Switch instead
import { Switch, SwitchProps } from 'antd'
import { useStateTogether } from 'react-together'

export interface InputSwitchTogetherProps
  extends Omit<SwitchProps, 'checked' | 'onChange'> {
  rtKey: string
}
export default function InputSwitchTogether({
  rtKey,
  ...props
}: InputSwitchTogetherProps) {
  const [checked, setChecked] = useStateTogether<boolean>(rtKey, false)
  return <Switch {...props} checked={checked} onChange={() => setChecked(!checked)} />
}
