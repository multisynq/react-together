import LinkSpan from '@components/ui/LinkSpan'
import { DocumentationPage } from '@pages/Documentation/DocumentationPage'
import { GenericDocNav } from '@pages/Documentation/GenericDocPage'
import { TabPanel } from 'primereact/tabview'
import { TabViewTogether } from '../../../../../../react-together'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

const name = 'TabViewTogether'
const originalName = 'TabView'
const docUrl = `https://primereact.org/tabview`

function PrimeReactTabViewTogetherDemo() {
  const content1 = 'Everyone is viewing Tab 1'
  const content2 = 'Everyone is viewing Tab 2'
  const content3 = 'Everyone is viewing Tab 3'
  return (
    <div className='flex-col place-items-center'>
      <TabViewTogether rtid='tab-together-doc-demo'>
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

export default function PrimeReactTabViewTogetherDocumentationPage() {
  const api = (
    <>
      <h5>Params</h5>
      <WrappedComponentPropsTable
        items={[
          {
            removed: false,
            name: 'rtid',
            type: 'string',
            description: (
              <p>
                The key used to identify this state, passed to the <LinkSpan to='/useStateTogether' text='useStateTogether' /> hook.
              </p>
            ),
          },
          {
            removed: true,
            name: 'activeIndex',
            description: (
              <p>
                Removed, as this value will be controlled by the <LinkSpan to='/useStateTogether' text='useStateTogether' /> hook.
              </p>
            ),
          },
        ]}
      />
    </>
  )
  const content = (
    <PrimeReactComponentDocumentationPage {...{ name, originalName, docUrl, api }} ComponentDemo={PrimeReactTabViewTogetherDemo} />
  )

  return <DocumentationPage content={content} navItems={GenericDocNav('TabViewTogether')} />
}
