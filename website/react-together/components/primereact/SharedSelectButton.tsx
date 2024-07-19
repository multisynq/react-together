import { SelectButton, SelectButtonProps } from 'primereact/selectbutton'
import useSharedState from '../../hooks/useSharedState'

export interface SharedSelectButtonProps extends Omit<SelectButtonProps, 'value' | 'onChange'> {
  rtid: string
  className?: string
}
export default function SharedSelectButton({ rtid, options, ...props }: SharedSelectButtonProps) {
  const [value, set_value] = useSharedState<unknown>(rtid, null)

  return (
    <SelectButton
      {...props}
      onChange={(e) => set_value(e.value || false)}
      options={options}
      value={value || options?.[0]}
      pt={{ button: (ctx) => ({ className: `border h-[8px] ${ctx.props.className}` }) }}
    />
  )
}
