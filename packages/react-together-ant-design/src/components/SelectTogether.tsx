import { useStateTogether } from '@multisynq/react-together'
import { Select, SelectProps } from 'antd'

export interface SelectTogetherProps
  extends Omit<SelectProps, 'value' | 'onChange'> {
  rtKey: string
}

export default function SelectTogether({
  rtKey,
  ...props
}: SelectTogetherProps) {
  const [value, set_value] = useStateTogether(rtKey, null)
  return <Select {...props} value={value} onChange={(e) => set_value(e)} />
}
