import { Knob, KnobProps } from 'primereact/knob'
import { useStateTogether } from '../../hooks'

export interface KnobTogetherProps
  extends Omit<KnobProps, 'value' | 'onChange'> {
  rtid: string
}
export default function KnobTogether({ rtid, ...props }: KnobTogetherProps) {
  const [value, set_value] = useStateTogether<number>(rtid, 0)

  return (
    <Knob {...props} value={value || 0} onChange={(e) => set_value(e.value)} />
  )
}
