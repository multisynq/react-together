import { MultiSelect, MultiSelectProps } from 'primereact/multiselect'
import { useStateTogether } from 'react-together'

export interface MultiSelectTogetherProps
  extends Omit<MultiSelectProps, 'value' | 'onChange'> {
  rtKey: string
}
export default function MultiSelectTogether({
  rtKey,
  ...props
}: MultiSelectTogetherProps) {
  const [value, set_value] = useStateTogether(rtKey, [])
  return (
    <MultiSelect
      {...props}
      value={value}
      onChange={(e) => set_value(e.value)}
    />
  )
}
