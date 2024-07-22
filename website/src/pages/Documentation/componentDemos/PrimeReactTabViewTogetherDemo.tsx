import { TabPanel } from 'primereact/tabview'
import { TabViewTogether } from '../../../../../react-together'

export function PrimeReactTabViewTogetherDemo() {
  const content1 = 'asdf'
  const content2 = 'ghjk'
  const content3 = 'dfgh'
  return (
    <div className='flex-col place-items-center'>
      <TabViewTogether rtid='active-index'>
        <TabPanel header='Header I'>
          <p className='m-0'>{content1}</p>
        </TabPanel>
        <TabPanel header='Header II'>
          <p className='m-0'>{content2}</p>
        </TabPanel>
        <TabPanel header='Header III'>
          <p className='m-0'>{content3}</p>
        </TabPanel>
      </TabViewTogether>
    </div>
  )
}
