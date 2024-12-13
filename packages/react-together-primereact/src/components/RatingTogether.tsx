import { useStateTogether } from '@multisynq/react-together'
import { Rating, RatingProps } from 'primereact/rating'
import { Nullable } from 'primereact/ts-helpers'

// There are some implications about making this component readOnly
// For example: How to ensure every user sees the same readOnly state
// for this component?
export interface RatingTogetherProps
  extends Omit<RatingProps, 'value' | 'onChange' | 'readOnly'> {
  rtKey: string
}
export default function RatingTogether({
  rtKey,
  ...props
}: RatingTogetherProps) {
  const [value, set_value] = useStateTogether<Nullable<number>>(rtKey, null)
  return (
    <Rating
      {...props}
      value={value || undefined}
      onChange={(e) => set_value(e.value)}
    />
  )
}
