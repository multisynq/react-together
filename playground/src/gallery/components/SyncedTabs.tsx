import { TabPanel } from 'primereact/tabview'
import { TabViewTogether } from 'react-together-primereact'
import tabsData from '../data/tabs.json'

const { content1, content2, content3 } = tabsData

export default function SyncedTabs() {
  return (
    <div>
      <TabViewTogether rtKey="active-index">
        <TabPanel header="Header I">
          <p className="m-0">{content1}</p>
        </TabPanel>
        <TabPanel header="Header II">
          <p className="m-0">{content2}</p>
        </TabPanel>
        <TabPanel header="Header III">
          <p className="m-0">{content3}</p>
        </TabPanel>
      </TabViewTogether>
    </div>
  )
}
