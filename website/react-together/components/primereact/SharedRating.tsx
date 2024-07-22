import { Rating, RatingProps } from 'primereact/rating'
import { Nullable } from 'primereact/ts-helpers'
import useSharedState from '../../hooks/useSharedState'

export interface SharedRatingProps
  extends Omit<RatingProps, 'value' | 'onChange' | 'readOnly'> {
  rtid: string
}
export default function SharedRating({ rtid, ...props }: SharedRatingProps) {
  const [value, set_value] = useSharedState<Nullable<number>>(rtid, null)
  return (
    <Rating
      {...props}
      value={value || undefined}
      onChange={(e) => set_value(e.value)}
    />
  )
}
