// import {
//   TriStateCheckbox,
//   TriStateCheckboxProps
// } from 'primereact/tristatecheckbox'
// import { Nullable } from 'primereact/ts-helpers'
// import { useStateTogether } from 'react-together'

// export interface TriStateCheckboxTogetherProps
//   extends Omit<TriStateCheckboxProps, 'value' | 'onChange'> {
//   rtKey: string
//   className?: string
// }
// export default function TriStateCheckboxTogether({
//   rtKey,
//   ...props
// }: TriStateCheckboxTogetherProps) {
//   const [value, setValue] = useStateTogether<Nullable<boolean>>(rtKey, false)

//   return (
//     <>
//       {/* Need the above div to ensure that tailwind will import the dynamic class.
//           The code below will not import it. =/  */}
//       {/* alternately, add all classes to the safeList: in tailwind.config.js  */}
//       {/* <div className="outline outline-1 outline-slate-400 rounded" style={{width: '1px', height: '10px'}}>x</div> */}

//       <TriStateCheckbox
//         {...props}
//         onChange={(e) => setValue(e.value)}
//         value={value}
//         className={`outline outline-1 outline-slate-400 rounded ${props.className}`}
//       />
//     </>
//   )
// }

// Use AntDesign Checkbox instead
import { Checkbox, CheckboxProps } from 'antd'
import { useStateTogether } from 'react-together'

export interface TriStateCheckboxTogetherProps
  extends Omit<CheckboxProps, 'checked' | 'onChange'> {
  rtKey: string
  className?: string
}

export default function TriStateCheckboxTogether({
  rtKey,
  ...props
}: TriStateCheckboxTogetherProps) {
  const [checked, setChecked] = useStateTogether<boolean>(rtKey, false)
  return (
    <Checkbox
      {...props}
      checked={checked}
      onChange={(e) => setChecked(e.target.checked || false)}
    />
  )
}
