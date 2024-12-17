import { Switch, SwitchProps } from 'antd'
import { useStateTogether } from 'react-together'

export interface SwitchTogetherProps
  extends Omit<SwitchProps, 'checked' | 'onChange'> {
  rtKey: string
}
export default function SwitchTogether({
  rtKey,
  ...props
}: SwitchTogetherProps) {
  const [checked, setChecked] = useStateTogether<boolean>(rtKey, false)
  return (
    <Switch
      {...props}
      checked={checked}
      onChange={() => setChecked(!checked)}
    />
  )
}
