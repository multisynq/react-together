import { TabView, TabViewProps } from 'primereact/tabview'
import useSharedState from '../../hooks/useSharedState'

export interface SharedTabViewrops
  extends Omit<TabViewProps, 'activeIndex' | 'onTabChange'> {
  rtid: string
}
export default function SharedTabView({ rtid, ...props }: SharedTabViewrops) {
  const [activeIndex, set_activeIndex] = useSharedState<number>(rtid, 0)

  return (
    <TabView
      {...props}
      activeIndex={activeIndex}
      onTabChange={(e) => set_activeIndex(e.index)}
    />
  )
}
