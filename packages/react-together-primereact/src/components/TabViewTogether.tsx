import { TabView, TabViewProps } from 'primereact/tabview'
import { useStateTogether } from 'react-together'

export interface TabViewTogetherrops
  extends Omit<TabViewProps, 'activeIndex' | 'onTabChange'> {
  rtKey: string
  headerClassName?: string
}

export default function TabViewTogether({
  rtKey,
  ...props
}: TabViewTogetherrops) {
  const [activeIndex, set_activeIndex] = useStateTogether<number>(rtKey, 0)

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
