import { Checkbox, CheckboxProps } from 'primereact/checkbox'
import useSharedState from '../../hooks/useSharedState'

export interface SharedCheckboxProps
  extends Omit<CheckboxProps, 'checked' | 'onChange'> {
  rtid: string
  className?:string
}
export default function SharedCheckbox({
  rtid,
  ...props
}: SharedCheckboxProps) {
  const [checked, setChecked] = useSharedState<boolean>(rtid, false)

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
        className={`outline outline-1 outline-slate-400 rounded ${props.className}`}
      />
    </>
  )
}
