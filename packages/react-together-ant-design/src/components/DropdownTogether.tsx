// import { Dropdown, DropdownProps } from 'primereact/dropdown'
// import { useStateTogether } from 'react-together'

// export interface DropdownTogetherProps
//   extends Omit<DropdownProps, 'value' | 'onChange'> {
//   rtKey: string
// }
// export default function DropdownTogether({
//   rtKey,
//   ...props
// }: DropdownTogetherProps) {
//   const [value, set_value] = useStateTogether(rtKey, null)
//   return (
//     <Dropdown {...props} value={value} onChange={(e) => set_value(e.value)} />
//   )
// }

// Ant Design Dropdown
import { Select, SelectProps } from 'antd'
import { useStateTogether } from 'react-together'

export interface DropdownTogetherProps
  extends Omit<SelectProps, 'value' | 'onChange'> {
  rtKey: string
}

export default function DropdownTogether({
  rtKey,
  ...props
}: DropdownTogetherProps) {
  const [value, set_value] = useStateTogether(rtKey, null)
  return (
    <Select {...props} value={value} onChange={(e) => set_value(e)} />
  )
}
