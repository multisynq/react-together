import { GenericDocNav } from '@pages/documentation/GenericDocPage'
import { DocumentationSkeleton } from '@pages/DocumentationSkeleton'
// import { TabViewTogether } from '../../../../../../../react-together'
import { PrimeReactComponentDocumentationPage } from './PrimeReactComponentDocumentationPage'

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
  const content = (
    <PrimeReactComponentDocumentationPage
      name='TabViewTogether'
      originalName='TabView'
      docUrl={`https://primereact.org/tabviewtogether/`}
      ComponentDemo={PrimeReactTabViewTogetherDemo}
    />
  )

  return <DocumentationSkeleton content={content} navItems={GenericDocNav('TabViewTogether')} keyToLookupWith='' />
}
