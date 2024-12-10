// import { Rating, RatingProps } from 'primereact/rating'
// import { Nullable } from 'primereact/ts-helpers'
// import { useStateTogether } from 'react-together'

// // There are some implications about making this component readOnly
// // For example: How to ensure every user sees the same readOnly state
// // for this component?
// export interface RatingTogetherProps
//   extends Omit<RatingProps, 'value' | 'onChange' | 'readOnly'> {
//   rtKey: string
// }
// export default function RatingTogether({
//   rtKey,
//   ...props
// }: RatingTogetherProps) {
//   const [value, set_value] = useStateTogether<Nullable<number>>(rtKey, null)
//   return (
//     <Rating
//       {...props}
//       value={value || undefined}
//       onChange={(e) => set_value(e.value)}
//     />
//   )
// }

// Ant Design Rating
import { Rate, RateProps } from 'antd'
import { useStateTogether } from 'react-together'

export interface RatingTogetherProps
  extends Omit<RateProps, 'value' | 'onChange'> {
  rtKey: string
}
export default function RatingTogether({
  rtKey,
  ...props
}: RatingTogetherProps) {
  const [value, setValue] = useStateTogether<number>(rtKey, 0)
  return <Rate {...props} value={value} onChange={(e) => setValue(e)} />
}
