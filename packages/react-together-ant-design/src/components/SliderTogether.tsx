import { Slider } from 'antd'
import type { SliderSingleProps } from 'antd/es/slider'
import { useStateTogether } from 'react-together'

export interface SliderTogetherProps
  extends Omit<SliderSingleProps, 'onChange'> {
  rtKey: string
}
export default function SliderTogether({ rtKey, value, defaultValue, ...props }: SliderTogetherProps) {
  const [val, set_val] = useStateTogether<number>(rtKey, value || defaultValue || 0)
  return <Slider {...props} value={val} onChange={(e) => set_val(e)} />
}
