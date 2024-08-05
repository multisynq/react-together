import { Knob, KnobProps } from 'primereact/knob'
import { useStateTogether } from 'react-together'

export interface KnobTogetherProps
  extends Omit<KnobProps, 'value' | 'onChange'> {
  rtKey: string
}
export default function KnobTogether({ rtKey, ...props }: KnobTogetherProps) {
  const [value, set_value] = useStateTogether<number>(rtKey, 0)

  return (
    <Knob {...props} value={value || 0} onChange={(e) => set_value(e.value)} />
  )
}
