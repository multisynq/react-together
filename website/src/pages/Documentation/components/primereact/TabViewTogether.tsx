import { GenericDocNav } from '@pages/documentation/GenericDocPage'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
// import { TabViewTogether } from '../../../../../../../react-together'
import WrappedComponentPropsTable from '../WrappedComponentPropsTable'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

const name = 'TabViewTogether'
const originalName = 'TabView'
const docUrl = `https://primereact.org/tabview`

function PrimeReactTabViewTogetherDemo() {
  const content1 = 'asdf'
  const content2 = 'ghjk'
  const content3 = 'dfgh'
  return (
    <div className='flex-col place-items-center'>
      {/* <TabViewTogether rtid='active-index'>
        <TabPanel header='Header I'>
          <p className='m-0'>{content1}</p>
        </TabPanel>
        <TabPanel header='Header II'>
          <p className='m-0'>{content2}</p>
        </TabPanel>
        <TabPanel header='Header III'>
          <p className='m-0'>{content3}</p>
        </TabPanel>
      </TabViewTogether> */}
      Demo {content1 + content2 + content3}
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
            description: 'The key used to identify this state, passed to the useStateTogether hook',
          },
          {
            removed: true,
            name: 'activeIndex',
            description: 'Removed, since this value will be controlled by the useStateTogether hook',
          },
        ]}
      />
    </>
  )
  const content = (
    <PrimeReactComponentDocumentationPage {...{ name, originalName, docUrl, api }} ComponentDemo={PrimeReactTabViewTogetherDemo} />
  )

  return <DocumentationSkeleton content={content} navItems={GenericDocNav('TabViewTogether')} keyToLookupWith='' />
}
