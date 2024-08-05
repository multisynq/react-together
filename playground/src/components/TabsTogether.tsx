import { TabPanel, TabView } from 'primereact/tabview'
import { useStateTogetherWithPerUserValues } from '../../react-together'
import tabsData from '../data/tabs.json'

const { content1, content2, content3 } = tabsData

export default function TabsTogether() {
  const debug = false
  const [activeIndex, setActiveIndex, allIndices] =
    useStateTogetherWithPerUserValues('active-index', 0)

  return (
    <>
      {debug && (
        <ul>
          {Object.entries(allIndices).map(([viewId, value]) => (
            <li>
              {viewId}: {JSON.stringify(value)}
            </li>
          ))}
        </ul>
      )}
      <div>
        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <TabPanel header="Header I">
            <p className="m-0">{content1}</p>
          </TabPanel>
          <TabPanel header="Header II">
            <p className="m-0">{content2}</p>
          </TabPanel>
          <TabPanel header="Header III">
            <p className="m-0">{content3}</p>
          </TabPanel>
        </TabView>
      </div>
    </>
  )
}
