import { useStateTogether } from '@multisynq/react-together'
import { Button, ButtonProps } from 'antd'

export interface ToggleButtonTogetherProps
  extends Omit<ButtonProps, 'checked' | 'onChange'> {
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
