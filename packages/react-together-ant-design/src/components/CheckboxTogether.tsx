import { useStateTogether } from '@multisynq/react-together'
import { Checkbox, CheckboxProps } from 'antd'

export interface CheckboxTogetherProps
  extends Omit<CheckboxProps, 'checked' | 'onChange'> {
  rtKey: string
  className?: string
}
export default function CheckboxTogether({
  rtKey,
  ...props
}: CheckboxTogetherProps) {
  const [checked, setChecked] = useStateTogether<boolean>(rtKey, false) // one value that all users see

  return (
    <>
      <Checkbox
        {...props}
        onChange={(e) => setChecked(e.target.checked || false)}
        checked={checked}
        className={`outline outline-1 outline-gray-400 rounded ${props.className}`}
      />
    </>
  )
}
