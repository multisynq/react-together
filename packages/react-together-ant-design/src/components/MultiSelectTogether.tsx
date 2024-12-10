// import { MultiSelect, MultiSelectProps } from 'primereact/multiselect'
// import { useStateTogether } from 'react-together'

// export interface MultiSelectTogetherProps
//   extends Omit<MultiSelectProps, 'value' | 'onChange'> {
//   rtKey: string
// }
// export default function MultiSelectTogether({
//   rtKey,
//   ...props
// }: MultiSelectTogetherProps) {
//   const [value, set_value] = useStateTogether(rtKey, [])
//   return (
//     <MultiSelect
//       {...props}
//       value={value}
//       onChange={(e) => set_value(e.value)}
//     />
//   )
// }

// Ant Design MultiSelect
import { Select, SelectProps } from 'antd'
import { useStateTogether } from 'react-together'

export interface MultiSelectTogetherProps 
  extends Omit<SelectProps, 'value' | 'onChange'> {
  rtKey: string
}
export default function MultiSelectTogether({
  rtKey,
  ...props
}: MultiSelectTogetherProps) {
  const [values, set_values] = useStateTogether(rtKey, [])
  return (
    <Select 
      mode='multiple'
      {...props} 
      value={values||[]} 
      onChange={(vals) => set_values(vals)} 
    />
  )
}
