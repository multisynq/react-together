import { useStateTogether } from '@multisynq/react-together'
import { Select, SelectProps } from 'antd'

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
      mode="multiple"
      {...props}
      value={values || []}
      onChange={(vals) => set_values(vals)}
    />
  )
}
