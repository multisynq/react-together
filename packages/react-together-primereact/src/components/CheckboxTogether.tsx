import { Checkbox, CheckboxProps } from 'primereact/checkbox'
import { useStateTogether } from 'react-together'

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
      {/* Need the above div to ensure that tailwind will import the dynamic class. 
        The code below will not import it. =/  */}
      {/* alternately, add all classes to the safeList: in tailwind.config.js  */}
      {/* <div className="outline outline-1 outline-slate-400 rounded" style={{width: '1px', height: '10px'}}>x</div> */}

      <Checkbox
        {...props}
        onChange={(e) => setChecked(e.checked || false)}
        checked={checked}
        className={`outline outline-1 outline-gray-400 rounded ${props.className}`}
      />
    </>
  )
}
