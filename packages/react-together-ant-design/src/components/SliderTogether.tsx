// import { Knob, KnobProps } from 'primereact/knob'
// import { useStateTogether } from 'react-together'

// export interface KnobTogetherProps
//   extends Omit<KnobProps, 'value' | 'onChange'> {
//   rtKey: string
// }
// export default function KnobTogether({ rtKey, ...props }: KnobTogetherProps) {
//   const [value, set_value] = useStateTogether<number>(rtKey, 0)

//   return (
//     <Knob {...props} value={value || 0} onChange={(e) => set_value(e.value)} />
//   )
// }

// Ant Design Slider
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

