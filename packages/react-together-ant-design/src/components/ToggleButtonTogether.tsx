// import { ToggleButton, ToggleButtonProps } from 'primereact/togglebutton'
// import { useStateTogether } from 'react-together'

// export interface ToggleButtonTogetherProps
//   extends Omit<ToggleButtonProps, 'value' | 'onChange'> {
//   rtKey: string
// }
// export default function ToggleButtonTogether({
//   rtKey,
//   ...props
// }: ToggleButtonTogetherProps) {
//   const [checked, set_checked] = useStateTogether<boolean>(rtKey, false)

//   return (
//     <ToggleButton
//       {...props}
//       checked={checked}
//       onChange={(e) => set_checked(e.value)}
//     />
//   )
// }

// AntDesign Switch instead
import { Button, ButtonProps } from 'antd'
import { useStateTogether } from 'react-together'

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
  onLabel  = 'Yes',
  offLabel = 'No',
  onIcon,
  offIcon,
  ...props
}: ToggleButtonTogetherProps) {
  const [isOn, setIsOn] = useStateTogether<boolean>(rtKey, false)
  const label = isOn ? onLabel : offLabel
  const icon  = isOn ? onIcon  : offIcon
  return <Button {...props} type={isOn ? 'primary' : 'default'} onClick={() => setIsOn(!isOn)}>
    {icon}
    {label}
  </Button>
}


