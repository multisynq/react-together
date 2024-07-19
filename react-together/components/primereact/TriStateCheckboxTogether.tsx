import {
  TriStateCheckbox,
  TriStateCheckboxProps
} from 'primereact/tristatecheckbox'
import { Nullable } from 'primereact/ts-helpers'
import { useStateTogether } from '../../hooks'

export interface TriStateCheckboxTogetherProps
  extends Omit<TriStateCheckboxProps, 'value' | 'onChange'> {
  rtid: string
  className?: string
}
export default function TriStateCheckboxTogether({
  rtid,
  ...props
}: TriStateCheckboxTogetherProps) {
  const [value, setValue] = useStateTogether<Nullable<boolean>>(rtid, false)

  return (
    <>
      {/* Need the above div to ensure that tailwind will import the dynamic class. 
          The code below will not import it. =/  */}
      {/* alternately, add all classes to the safeList: in tailwind.config.js  */}
      {/* <div className="outline outline-1 outline-slate-400 rounded" style={{width: '1px', height: '10px'}}>x</div> */}

      <TriStateCheckbox
        {...props}
        onChange={(e) => setValue(e.value)}
        value={value}
        className={`outline outline-1 outline-slate-400 rounded ${props.className}`}
      />
    </>
  )
}
