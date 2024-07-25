import { Rating, RatingProps } from 'primereact/rating'
import { Nullable } from 'primereact/ts-helpers'
import { useStateTogether } from '../../hooks'

// There are some implications about making this component readOnly
// For example: How to ensure every user sees the same readOnly state
// for this component?
export interface RatingTogetherProps
  extends Omit<RatingProps, 'value' | 'onChange' | 'readOnly'> {
  rtid: string
}
export default function RatingTogether({
  rtid,
  ...props
}: RatingTogetherProps) {
  const [value, set_value] = useStateTogether<Nullable<number>>(rtid, null)
  return (
    <Rating
      {...props}
      value={value || undefined}
      onChange={(e) => set_value(e.value)}
    />
  )
}
