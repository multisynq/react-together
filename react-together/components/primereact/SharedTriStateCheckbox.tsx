import {
  TriStateCheckbox,
  TriStateCheckboxProps
} from 'primereact/tristatecheckbox'
import { Nullable } from 'primereact/ts-helpers'
import useSharedState from '../../hooks/useSharedState'

export interface SharedTriStateCheckboxProps
  extends Omit<TriStateCheckboxProps, 'value' | 'onChange'> {
  rtid: string
}
export default function SharedTriStateCheckbox({
  rtid,
  ...props
}: SharedTriStateCheckboxProps) {
  const [value, setValue] = useSharedState<Nullable<boolean>>(rtid, false)

  return (
    <TriStateCheckbox
      {...props}
      onChange={(e) => setValue(e.value)}
      value={value}
    />
  )
}
