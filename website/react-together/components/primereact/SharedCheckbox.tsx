import { Checkbox, CheckboxProps } from 'primereact/checkbox'
import useSharedState from '../../hooks/useSharedState'

export interface SharedCheckboxProps
  extends Omit<CheckboxProps, 'checked' | 'onChange'> {
  rtid: string
}
export default function SharedCheckbox({
  rtid,
  ...props
}: SharedCheckboxProps) {
  const [checked, setChecked] = useSharedState<boolean>(rtid, false)

  return (
    <Checkbox
      {...props}
      onChange={(e) => setChecked(e.checked || false)}
      checked={checked}
    />
  )
}
