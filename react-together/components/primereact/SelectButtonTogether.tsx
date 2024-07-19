import { SelectButton, SelectButtonProps } from 'primereact/selectbutton'
import { useStateTogether } from '../../hooks'

export interface SelectButtonTogetherProps
  extends Omit<SelectButtonProps, 'value' | 'onChange'> {
  rtid: string
  className?: string
}
export default function SelectButtonTogether({
  rtid,
  options,
  ...props
}: SelectButtonTogetherProps) {
  const [value, set_value] = useStateTogether<unknown>(rtid, null)

  return (
    <SelectButton
      {...props}
      onChange={(e) => set_value(e.value || false)}
      options={options}
      value={value || options?.[0]}
      pt={{
        button: (ctx) => ({
          className: `border h-[15px] ${(ctx || { props: {} }).props.className}`
        })
      }}
    />
  )
}
