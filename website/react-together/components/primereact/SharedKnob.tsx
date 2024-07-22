import { Knob, KnobProps } from 'primereact/knob'
import useSharedState from '../../hooks/useSharedState'

export interface SharedKnobProps extends Omit<KnobProps, 'value' | 'onChange'> {
  rtid: string
}
export default function SharedKnob({ rtid, ...props }: SharedKnobProps) {
  const [value, set_value] = useSharedState<number>(rtid, 0)

  return <Knob {...props} value={value||0} onChange={(e) => set_value(e.value)} />
}
