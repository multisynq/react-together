import { TabView, TabViewProps } from 'primereact/tabview'
import { useStateTogether } from '../../hooks'

export interface TabViewTogetherrops
  extends Omit<TabViewProps, 'activeIndex' | 'onTabChange'> {
  rtid: string
  headerClassName?: string
}

export default function TabViewTogether({
  rtid,
  ...props
}: TabViewTogetherrops) {
  const [activeIndex, set_activeIndex] = useStateTogether<number>(rtid, 0)

  return (
    <TabView
      {...props}
      activeIndex={activeIndex}
      onTabChange={(e) => set_activeIndex(e.index)}
      pt={{
        panelContainer: { className: 'bg-transparent' },
        root: {
          className: 'border-gray-700 shadow-md px-4 rounded-xl'
        }
      }}
    />
  )
}
