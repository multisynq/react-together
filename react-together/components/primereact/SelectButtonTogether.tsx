import { SelectButton, SelectButtonProps } from 'primereact/selectbutton'
import { useStateTogether } from '../../hooks'

export interface SelectButtonTogetherProps
  extends Omit<SelectButtonProps, 'value' | 'onChange'> {
  rtid: string
  className?: string
  pt?: SelectButtonProps['pt']
}

export default function SelectButtonTogether({
  rtid,
  options,
  pt,
  ...props
}: SelectButtonTogetherProps) {
  const [value, set_value] = useStateTogether<unknown>(rtid, null)

  return (
    <SelectButton
      {...props}
      onChange={(e) => set_value(e.value || false)}
      options={options}
      value={value || options?.[0]}
      pt={pt}
    />
  )
}
