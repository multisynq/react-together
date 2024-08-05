import { TabPanel } from 'primereact/tabview'
import { TabViewTogether } from 'react-together'

export function PrimeReactTabViewTogetherDemo() {
  const content1 = 'Everyone is viewing Tab 1'
  const content2 = 'Everyone is viewing Tab 2'
  const content3 = 'Everyone is viewing Tab 3'
  return (
    <div className='flex-col place-items-center'>
      <TabViewTogether rtKey='tab-together-doc-demo'>
        <TabPanel header='Tab I'>
          <p className='m-0'>{content1}</p>
        </TabPanel>
        <TabPanel header='Tab II'>
          <p className='m-0'>{content2}</p>
        </TabPanel>
        <TabPanel header='Tab III'>
          <p className='m-0'>{content3}</p>
        </TabPanel>
      </TabViewTogether>
    </div>
  )
}
