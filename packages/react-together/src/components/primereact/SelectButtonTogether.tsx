import { SelectButton, SelectButtonProps } from 'primereact/selectbutton'
import { useStateTogether } from '../../hooks'

export interface SelectButtonTogetherProps
  extends Omit<SelectButtonProps, 'value' | 'onChange'> {
  rtKey: string
  className?: string
}
export default function SelectButtonTogether({
  rtKey,
  options,
  ...props
}: SelectButtonTogetherProps) {
  const [value, set_value] = useStateTogether<unknown>(rtKey, null)

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
