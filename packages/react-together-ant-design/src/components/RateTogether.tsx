import { useStateTogether } from '@multisynq/react-together'
import { Rate, RateProps } from 'antd'

export interface RateTogetherProps
  extends Omit<RateProps, 'value' | 'onChange'> {
  rtKey: string
}
export default function RateTogether({ rtKey, ...props }: RateTogetherProps) {
  const [value, setValue] = useStateTogether<number>(rtKey, 0)
  return <Rate {...props} value={value} onChange={(e) => setValue(e)} />
}
