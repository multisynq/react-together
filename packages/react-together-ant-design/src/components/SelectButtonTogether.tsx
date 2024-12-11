import { Radio, RadioProps } from 'antd'
import { useStateTogether } from 'react-together'

export interface SelectButtonTogetherProps 
  extends Omit<RadioProps, 'value' | 'onChange'> {
  rtKey: string
  items: { label: string, value: string }[]
}

export default function SelectButtonTogether({
  rtKey,
  items,
  ...props
}: SelectButtonTogetherProps) {
  const [value, set_value] = useStateTogether(rtKey, null)
  return <Radio.Group {...props} value={value} onChange={(e) => set_value(e.target.value)}>
    {items.map((item) => (
      <Radio.Button key={item.value} value={item.value}>
        {item.label}
      </Radio.Button>
    ))}
  </Radio.Group>
}
