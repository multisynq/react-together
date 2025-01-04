import { Button, ButtonProps } from 'antd'
import { useStateTogether } from 'react-together'

export interface ToggleButtonTogetherProps
  extends Omit<ButtonProps, 'onChange'> {
  rtKey: string
  onLabel?: string
  offLabel?: string
  onIcon?: React.ReactNode
  offIcon?: React.ReactNode
}
export default function ToggleButtonTogether({
  rtKey,
  onLabel = 'Yes',
  offLabel = 'No',
  onIcon,
  offIcon,
  ...props
}: ToggleButtonTogetherProps) {
  const [isOn, setIsOn] = useStateTogether<boolean>(rtKey, false)
  const label = isOn ? onLabel : offLabel
  const icon = isOn ? onIcon : offIcon
  return (
    <Button
      {...props}
      type={isOn ? 'primary' : 'default'}
      onClick={() => setIsOn(!isOn)}
    >
      {icon}
      {label}
    </Button>
  )
}
